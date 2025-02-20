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

    this.router.get(`${this.prefix}/:id`, (req: Request, res: Response) =>
      this.getRoom(req, res)
    );

    this.router.get(`${this.prefix}/pj/:id_pj`, (req: Request, res: Response) =>
      this.getRoomsByPj(req, res)
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

  private async getRoomsByPj(req: Request, res: Response) {
    const rooms = await this.roomService.getRoomsByPj(req.params.id_pj);

    return new SuccessResult({
      msg: Result.transformRequestOnMsg(req),
      data: rooms,
    }).handle(res);
  }

  private async getRoom(req: Request, res: Response) {
    const room = await this.roomService.getRoom(req.params.id);

    return new SuccessResult({
      msg: Result.transformRequestOnMsg(req),
      data: room,
    }).handle(res);
  }

  private async createRoom(req: Request, res: Response) {
    this.validateRoom(req.body, res);
    if (res.headersSent) return;

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

  private validateRoom(data: any, res: Response) {
    console.log('description:', data.type);

    data.tv = data.tv ?? false;
    data.ar_condicionado = data.ar_condicionado ?? false;
    data.wifi = data.wifi ?? false;
    data.petFriendly = data.petFriendly ?? false;
    data.cafeDaManha = data.cafeDaManha ?? false;
    data.estacionamento = data.estacionamento ?? false;

    if (!data.description) {
      res.status(400).json({ error: 'A descrição do quarto é obrigatória' });
    }
    if (!data.type) {
      res.status(400).json({ error: 'O tipo do quarto é obrigatório' });
    }
    if (!data.price) {
      res.status(400).json({ error: 'O preço do quarto é obrigatório' });
    }
    if (data.price < 50) {
      res.status(400).json({ error: 'O preço mínimo da diária é de 50 reais' });
    }
    if (!data.capacity) {
      res.status(400).json({ error: 'A capacidade do quarto é obrigatória' });
    }
    if (!data.caracteristics_ids) {
      res
        .status(400)
        .json({ error: 'As caracteristicas do quarto sao obrigatórias' });
    }
    if (!data.local) {
      res.status(400).json({ error: 'O local do quarto é obrigatório' });
    }
    if (!data.stars) {
      res
        .status(400)
        .json({ error: 'O número de estrelas do quarto é obrigatório' });
    }
  }
}

export default RoomController;
