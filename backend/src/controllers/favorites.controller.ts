import { Router, Request, Response } from 'express';
import { Result, SuccessResult } from '../utils/result';
import FavoriteService from '../services/favorite.service';

class FavoritesController {
  private prefix: string = '/favorites';
  public router: Router;
  private favoriteService: FavoriteService;

  constructor(router: Router, favoriteService: FavoriteService) {
    this.router = router;
    this.favoriteService = favoriteService;
    this.initRoutes();
  }

  private initRoutes() {
    this.router.get(`${this.prefix}/:id`, (req: Request, res: Response) =>
      this.getFavorites(req, res)
    );

    this.router.patch(`${this.prefix}/:id`, (req: Request, res: Response) =>
      this.addFavorite(req, res)
    );
  }

  private async getFavorites(req: Request, res: Response) {
    const favorites = await this.favoriteService.getFavorites(req.params.id);

    return new SuccessResult({
      msg: Result.transformRequestOnMsg(req),
      data: favorites,
    }).handle(res);
  }

  private async addFavorite(req: Request, res: Response) {
    const favorite = await this.favoriteService.updateFavorite(
      req.body.favorites,
      req.params.id
    );

    return new SuccessResult({
      msg: Result.transformRequestOnMsg(req),
      data: favorite,
    }).handle(res);
  }
}

export default FavoritesController;
