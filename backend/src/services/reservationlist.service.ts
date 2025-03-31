import ReservationRepository from '../repositories/reservation.repository';
import ReservationEntity from '../entities/reservation.entity';
import { v4 as uuidv4 } from 'uuid';

export default class ReservationService {
  private reservationRepository: ReservationRepository;

  constructor(resevationRepository: ReservationRepository) {
    this.reservationRepository = resevationRepository;
  }

  //Listar reservas de uma dada acomodação
}
