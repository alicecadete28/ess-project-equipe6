import ReservationEntity from '../entities/reservation.entity';
import ReservationModel from '../models/reservation.model';
import ReservationRepository from '../repositories/reservation.repository';
import { HttpNotFoundError } from '../utils/errors/http.error';
import { v4 as uuidv4 } from 'uuid';

class ReservationServiceMessageCode {
  public static readonly reservation_not_found = 'reservation_not_found';
}

class ReservationService {
  private reservationRepository: ReservationRepository;

  constructor(reservationRepository: ReservationRepository) {
    this.reservationRepository = reservationRepository;
  }

  public async createReservation(
    data: Omit<ReservationEntity, 'id' | 'status' | 'rating'>
  ): Promise<ReservationModel> {
    const newReservation = new ReservationEntity({
      id: uuidv4(),
      ...data,
      status: 'pending', 
      rating: { stars: 0, comment: '' },
    });

    const createdReservation = await this.reservationRepository.add(newReservation);
    return new ReservationModel(createdReservation);
  }

  public async confirmReservation(reservationId: string): Promise<ReservationModel> {
    const updatedReservation = await this.reservationRepository.update(
      (reservation) => reservation.id === reservationId,
      { status: 'confirmed' }
    );

    if (!updatedReservation) {
      throw new HttpNotFoundError({
        msg: 'Reservation not found',
        msgCode: ReservationServiceMessageCode.reservation_not_found,
      });
    }

    return new ReservationModel(updatedReservation);
  }

  public async updateReservationDates(
    reservationId: string,
    checkIn: Date,
    checkOut: Date
  ): Promise<ReservationModel> {
    const updatedReservation = await this.reservationRepository.update(
      (reservation) => reservation.id === reservationId,
      { check_in: checkIn, check_out: checkOut }
    );

    if (!updatedReservation) {
      throw new HttpNotFoundError({
        msg: 'Reservation not found',
        msgCode: ReservationServiceMessageCode.reservation_not_found,
      });
    }

    return new ReservationModel(updatedReservation);
  }

  public async updateReservationGuests(reservationId: string, guests: number): Promise<ReservationModel> {
    const updatedReservation = await this.reservationRepository.update(
      (reservation) => reservation.id === reservationId,
      { guests }
    );

    if (!updatedReservation) {
      throw new HttpNotFoundError({
        msg: 'Reservation not found',
        msgCode: ReservationServiceMessageCode.reservation_not_found,
      });
    }

    return new ReservationModel(updatedReservation);
  }

  public async getReservationByRoomId(roomId: string): Promise<ReservationModel[]> {
    const reservations = (await this.reservationRepository.getReservationByRoomId(roomId)) ?? [];
    return reservations.map((reservation) => new ReservationModel(reservation));

  }

  public async getReservationByPFId(pfId: string): Promise<ReservationModel[]> {
    const reservations = (await this.reservationRepository.getReservationByPFId(pfId)) ?? [];
    return reservations.map((reservation) => new ReservationModel(reservation));
  }

  public async cancelReservation(reservationId: string): Promise<ReservationModel> {
    const updatedReservation = await this.reservationRepository.update(
      (reservation) => reservation.id === reservationId,
      { status: 'canceled' }
    );

    if (!updatedReservation) {
      throw new HttpNotFoundError({
        msg: 'Reservation not found',
        msgCode: ReservationServiceMessageCode.reservation_not_found,
      });
    }

    return new ReservationModel(updatedReservation);
  }
}

export default ReservationService;
