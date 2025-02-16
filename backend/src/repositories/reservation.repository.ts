import BaseRepository from './base.repository';
import ReservationEntity from '../entities/reservation.entity';

export default class ReservationRepository extends BaseRepository<ReservationEntity> {
  constructor() {
    super('reservations'); // Usa "reservations" como chave no banco de dados
  }
}