import { Router, Request, Response } from 'express';
import { Result, SuccessResult } from '../utils/result';
import ReservationService from '../services/reservation.service';

class ReservationController {
  private prefix: string = '/reservations';
  public router: Router;
  private reservationService: ReservationService;

  constructor(router: Router, reservationService: ReservationService) {
    this.router = router;
    this.reservationService = reservationService;
    this.initRoutes();
  }

  private initRoutes() {
    this.router.post(this.prefix, (req: Request, res: Response) => this.createReservation(req, res));
    this.router.patch(`${this.prefix}/:reservationId/confirm`, (req: Request, res: Response) => this.confirmReservation(req, res));
    this.router.patch(`${this.prefix}/:reservationId/dates`, (req: Request, res: Response) => this.updateReservationDates(req, res));
    this.router.patch(`${this.prefix}/:reservationId/guests`, (req: Request, res: Response) => this.updateReservationGuests(req, res));
    this.router.get(`${this.prefix}/:reservationId`, (req: Request, res: Response) => this.getReservation(req, res));
  }

  private async createReservation(req: Request, res: Response) {
    const { pf_id, room_id, check_in, check_out, guests, total } = req.body;
    const newReservation = await this.reservationService.createReservation({ 
      pf_id, 
      room_id, 
      check_in: new Date(check_in), 
      check_out: new Date(check_out), 
      guests, total, 
      status: 'pending', 
      rating: 0, 
      confirmed: false, 
      id:''});
    return new SuccessResult({ msg: Result.transformRequestOnMsg(req), data: newReservation }).handle(res);
  }

  private async confirmReservation(req: Request, res: Response) {
    const updatedReservation = await this.reservationService.confirmReservation(req.params.reservationId);
    return new SuccessResult({ msg: Result.transformRequestOnMsg(req), data: updatedReservation }).handle(res);
  }

  private async updateReservationDates(req: Request, res: Response) {
    const { check_in, check_out } = req.body;
    const updatedReservation = await this.reservationService.updateReservationDates(req.params.reservationId, new Date(check_in), new Date(check_out));
    return new SuccessResult({ msg: Result.transformRequestOnMsg(req), data: updatedReservation }).handle(res);
  }

  private async updateReservationGuests(req: Request, res: Response) {
    const { guests } = req.body;
    const updatedReservation = await this.reservationService.updateReservationGuests(req.params.reservationId, guests);
    return new SuccessResult({ msg: Result.transformRequestOnMsg(req), data: updatedReservation }).handle(res);
  }

  private async getReservation(req: Request, res: Response){
    const { reservationId } = req.params;
    const reservation = await this.reservationService.getReservation(reservationId);
    return new SuccessResult({ msg: Result.transformRequestOnMsg(req), data: reservation }).handle(res);
  }
}

export default ReservationController;
