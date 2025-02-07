import { Router, Request, Response } from 'express';
import { Result, SuccessResult } from '../utils/result';
import RoomService from '../services/room.service';
import RoomEntity from '../entities/room.entity';

class RoomController {
  private prefix: string = '/rooms';
  public router: Router;
  private roomService: RoomService;

  constructor(router: Router, roomService: RoomService) {
    this.router = router;
    this.roomService = roomService;
    this.initRoutes();
  }

  private initRoutes() {
    this.router.get(this.prefix, (req: Request, res: Response) =>
      this.getRooms(req, res)
    );

    // this.router.get(`${this.prefix}/others`, (req: Request, res: Response) =>
    //   this.getOthersTests(req, res)
    // );

    this.router.get(`${this.prefix}/:id`, (req: Request, res: Response) =>
      this.getRoom(req, res)
    );
    this.router.post(this.prefix, (req: Request, res: Response) =>
      this.createRoom(req, res)
    );
    this.router.put(`${this.prefix}/:id`, (req: Request, res: Response) =>
      this.updateRoom(req, res)
    );
    this.router.delete(`${this.prefix}/:id`, (req: Request, res: Response) =>
      this.deleteRoom(req, res)
    );
  }

  private async getRooms(req: Request, res: Response) {
    const rooms = await this.roomService.getRooms();

    return new SuccessResult({
      msg: Result.transformRequestOnMsg(req),
      data: rooms,
    }).handle(res);
  }

  // private async getOthersTests(req: Request, res: Response) {
  //   const tests = await this.testService.getOtherTests();

  //   return new SuccessResult({
  //     msg: Result.transformRequestOnMsg(req),
  //     data: tests,
  //   }).handle(res);
  // }

  private async getRoom(req: Request, res: Response) {
    const room = await this.roomService.getRoom(req.params.id);

    return new SuccessResult({
      msg: Result.transformRequestOnMsg(req),
      data: room,
    }).handle(res);
  }

  private async createRoom(req: Request, res: Response) {
    const room = await this.roomService.createRoom(new RoomEntity(req.body));

    return new SuccessResult({
      msg: Result.transformRequestOnMsg(req),
      data: room,
    }).handle(res);
  }

  private async updateRoom(req: Request, res: Response) {
    const room = await this.roomService.updateRoom(
      req.params.id,
      new RoomEntity(req.body)
    );

    return new SuccessResult({
      msg: Result.transformRequestOnMsg(req),
      data: room,
    }).handle(res);
  }

  private async deleteRoom(req: Request, res: Response) {
    await this.roomService.deleteRoom(req.params.id);

    return new SuccessResult({
      msg: Result.transformRequestOnMsg(req),
    }).handle(res);
  }
}

export default RoomController;
