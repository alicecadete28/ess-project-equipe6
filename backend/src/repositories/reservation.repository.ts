import BaseRepository from './base.repository';
import ReservationEntity from '../entities/reservation.entity';

export default class ReservationRepository extends BaseRepository<ReservationEntity> {
  constructor() {
    super('reservations');
  }

  async createReservation(data: ReservationEntity): Promise<ReservationEntity> {
    return super.add(data);
  }

  async confirmReservation(id: string): Promise<ReservationEntity | null> {
    const reservation = await this.findById(id);
    if (reservation) {
      reservation.confirmed = true;
      await this.updateById(id, reservation);
    }
    return reservation;
  }

  async updateReservationDates(id: string, check_in: Date, check_out: Date): Promise<ReservationEntity | null> {
    const reservation = await this.findById(id);
    if (reservation) {
      reservation.check_in = check_in;
      reservation.check_out = check_out;
      await this.updateById(id, reservation);
    }
    return reservation;
  }

  async updateReservationGuests(id: string, guests: number): Promise<ReservationEntity | null> {
    const reservation = await this.findById(id);
    if (reservation) {
      reservation.guests = guests;
      await this.updateById(id, reservation);
    }
    return reservation;
  }

  async findById(id: string): Promise<ReservationEntity | null> {
    return super.findOne(item => item.id === id);
  }

  async create(data: ReservationEntity): Promise<ReservationEntity> {
    return super.add(data);
  }

  async updateById(id: string, data: Partial<ReservationEntity>): Promise<ReservationEntity | null> {
    return super.update(item => item.id === id, data);
  }
}
