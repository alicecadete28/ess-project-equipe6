import BaseRepository from './base.repository';
import ReservationEntity from '../entities/reservation.entity';

export default class ReservationRepository extends BaseRepository<ReservationEntity> {
  constructor() {
    super('reservations'); // Usa "reservations" como chave no banco de dados
  }

  public async getReservationByRoomId(roomId: string): Promise<ReservationEntity[] | null> {
      return await this.findAll((item) => item.room_id === roomId);
  }

  public async getReservationByPFId(roomId: string): Promise<ReservationEntity[] | null> {
    return await this.findAll((item) => item.pf_id === roomId);
}

}