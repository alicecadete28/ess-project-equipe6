import ReservationEntity from '../entities/reservation.entity';
import ReservationModel from '../models/reservation.model';
import ReservationRepository from '../repositories/reservation.repository';
import { HttpNotFoundError } from '../utils/errors/http.error';

class ReservationServiceMessageCode {
  public static readonly reservation_not_found = 'reservation_not_found';
}

class ReservationService {
  private reservationRepository: ReservationRepository;

  constructor(reservationRepository: ReservationRepository) {
    this.reservationRepository = reservationRepository;
  }

  public async createReservation(data: ReservationEntity): Promise<ReservationModel> {
    const reservationEntity = await this.reservationRepository.createReservation(data);
    return new ReservationModel(reservationEntity);
  }

  public async confirmReservation(id: string): Promise<ReservationModel> {
    const reservationEntity = await this.reservationRepository.confirmReservation(id);
    if (!reservationEntity) {
      throw new HttpNotFoundError({
        msg: 'Reservation not found',
        msgCode: ReservationServiceMessageCode.reservation_not_found,
      });
    }
    return new ReservationModel(reservationEntity);
  }

  public async updateReservationDates(id: string, check_in: Date, check_out: Date): Promise<ReservationModel> {
    const reservationEntity = await this.reservationRepository.updateReservationDates(id, check_in, check_out);
    if (!reservationEntity) {
      throw new HttpNotFoundError({
        msg: 'Reservation not found',
        msgCode: ReservationServiceMessageCode.reservation_not_found,
      });
    }
    return new ReservationModel(reservationEntity);
  }

  public async updateReservationGuests(id: string, guests: number): Promise<ReservationModel> {
    const reservationEntity = await this.reservationRepository.updateReservationGuests(id, guests);
    if (!reservationEntity) {
      throw new HttpNotFoundError({
        msg: 'Reservation not found',
        msgCode: ReservationServiceMessageCode.reservation_not_found,
      });
    }
    return new ReservationModel(reservationEntity);
  }

  public async getReservation(id: string): Promise<ReservationModel> {
    const reservation = await this.reservationRepository.findById(id); 
    if (!reservation) {
      throw new HttpNotFoundError({
        msg: 'Reserva não encontrada',
        msgCode: 'reserve_not_found',
      });
    }
    return new ReservationModel(reservation!);

  }

}

export default ReservationService;
