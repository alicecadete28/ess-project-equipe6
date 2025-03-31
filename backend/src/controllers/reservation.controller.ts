import { Router, Request, Response } from 'express';
import { Result, SuccessResult } from '../utils/result';
import ReservationService from '../services/reservation.service';
import Database from '../database';
import { di } from '../di';

class ReservationController {
  private prefix: string = '/reservations';
  public router: Router;
  private reservationService: ReservationService;

  constructor(router: Router, reservationService: ReservationService) {
    this.router = router;
    this.reservationService = reservationService;
    this.router.get(`${this.prefix}/:reservationId`, (req: Request, res: Response) => this.getReservationDetails(req, res));
    this.initRoutes();
  }

  private initRoutes() {
    this.router.post(this.prefix, (req: Request, res: Response) =>
      this.createReservation(req, res)
    );

    this.router.patch(
      `${this.prefix}/:reservationId/confirm`,
      (req: Request, res: Response) => this.confirmReservation(req, res)
    );

    this.router.patch(
      `${this.prefix}/:reservationId/dates`,
      (req: Request, res: Response) => this.updateReservationDates(req, res)
    );

    this.router.patch(
      `${this.prefix}/:reservationId/guests`,
      (req: Request, res: Response) => this.updateReservationGuests(req, res)
    );

    this.router.patch(
      `${this.prefix}/:reservationId/cancel`,
      (req: Request, res: Response) => this.updateReservationStatus(req, res)
    );
  }

  private async getReservationDetails(req: Request, res: Response) {
    const reservationId = req.params.reservationId;
    const db = Database.getInstance().data;
  
    
    const reservation = db.reservations.find(r => r.id === reservationId);
    if (!reservation) return res.status(404).json({ message: "Reserva não encontrada" });
  
    const room = db.rooms.find(r => r.id === reservation.room_id);
    if (!room) return res.status(404).json({ message: "Quarto não encontrado" });
  
    return res.json({ reservation, room });
  }

  private async createReservation(req: Request, res: Response) {
    const { pf_id, room_id, check_in, check_out, guests, total } = req.body;
    const newReservation = await this.reservationService.createReservation({
      pf_id,
      room_id,
      check_in: new Date(check_in),
      check_out: new Date(check_out),
      guests,
      total,
      confirmed: false,
    });

    return new SuccessResult({
      msg: Result.transformRequestOnMsg(req),
      data: newReservation,
    }).handle(res);
  }

  private async confirmReservation(req: Request, res: Response) {
    const updatedReservation = await this.reservationService.confirmReservation(
      req.params.reservationId
    );

    return new SuccessResult({
      msg: Result.transformRequestOnMsg(req),
      data: updatedReservation,
    }).handle(res);
  }

  private async updateReservationDates(req: Request, res: Response) {
    const { check_in, check_out } = req.body;

    const updatedReservation =
      await this.reservationService.updateReservationDates(
        req.params.reservationId,
        new Date(check_in),
        new Date(check_out)
      );

    return new SuccessResult({
      msg: Result.transformRequestOnMsg(req),
      data: updatedReservation,
    }).handle(res);
  }

  private async updateReservationGuests(req: Request, res: Response) {
    const { guests } = req.body;
    const updatedReservation =
      await this.reservationService.updateReservationGuests(
        req.params.reservationId,
        guests
      );

    return new SuccessResult({
      msg: Result.transformRequestOnMsg(req),
      data: updatedReservation,
    }).handle(res);
  }

  private async updateReservationStatus(req: Request, res: Response) { //Mudar para o estado de cancelado
    const updatedReservation =
      await this.reservationService.cancelReservation(
        req.params.reservationId,
      );

    return new SuccessResult({
      msg: Result.transformRequestOnMsg(req),
      data: updatedReservation,
    }).handle(res);
  }
}

export default ReservationController;
