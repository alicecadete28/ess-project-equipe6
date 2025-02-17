import { Router, Request, Response } from 'express';
import { Result, SuccessResult } from '../utils/result';
import SavedService from '../services/saved.service';

class SavedController {
  private prefix: string = '/saved';
  public router: Router;
  private savedService: SavedService;

  constructor(router: Router, savedService: SavedService) {
    this.router = router;
    this.savedService = savedService;
    this.initRoutes();
  }

  private initRoutes() {
    this.router.get(`${this.prefix}/:id`, (req: Request, res: Response) =>
      this.getSaved(req, res)
    );

    this.router.patch(`${this.prefix}/:id`, (req: Request, res: Response) =>
      this.addSaved(req, res)
    );
  }

  private async getSaved(req: Request, res: Response) {
    const saved = await this.savedService.getSaved(req.params.id);

    return new SuccessResult({
      msg: Result.transformRequestOnMsg(req),
      data: saved,
    }).handle(res);
  }

  private async addSaved(req: Request, res: Response) {
    const saved = await this.savedService.updateSaved(req.body.saved, req.params.id);

    return new SuccessResult({
      msg: Result.transformRequestOnMsg(req),
      data: saved,
    }).handle(res);
  }
}

export default SavedController;
