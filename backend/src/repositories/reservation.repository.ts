import BaseRepository from './base.repository';
import ReservationEntity from '../entities/reservation.entity';



class ReservationRepository extends BaseRepository<ReservationEntity> {
  constructor() {
    super('reservations');
  }

  public async getReservations(): Promise<ReservationEntity[]> {
    return await this.findAll();
  }

  public async getReservation(id: string): Promise<ReservationEntity | null> {
    return await this.findOne((item) => item.id === id);
  }

  public async createReservation(data: ReservationEntity): Promise<ReservationEntity> {
    return await this.add(data);
  }

  public async updateReservation(
    id: string,
    data: ReservationEntity
  ): Promise<ReservationEntity | null> {
    return await this.update((item) => item.id === id, data);
  }

  public async deleteReservation(id: string): Promise<void> {
    await this.delete((item) => item.id !== id);
  }

  public async getReservationByRoomId(roomId: string): Promise<ReservationEntity[] | null> {
    return await this.findAll((item) => item.room_id === roomId);
  }

  public async getReservationByPFId(roomId: string): Promise<ReservationEntity[] | null> {
    return await this.findAll((item) => item.pf_id === roomId);
  }
}
export default ReservationRepository;
