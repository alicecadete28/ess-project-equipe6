import ReservationRepository from '../repositories/reservation.repository';
import ReservationEntity from '../entities/reservation.entity';
import { v4 as uuidv4 } from 'uuid';

export default class ReservationService {
  private reservationRepository: ReservationRepository;

  constructor() {
    this.reservationRepository = new ReservationRepository();
  }

  //Listar reservas de uma dada acomodação
  public async getReservationByRoomId(roomId: string): Promise<ReservationEntity[] | null> {
    // console.log(this.reservationRepository.getReservationByRoomId(roomId), "nao entrou");
    return this.reservationRepository.getReservationByRoomId(roomId);
  }

  //Listar reservas feitas por um dado usuário
  public async getReservationByPFId(pfId: string): Promise<ReservationEntity[] | null> {
    return this.reservationRepository.getReservationByPFId(pfId);
  }

  public async cancelReservation(reservationId: string): Promise<ReservationEntity | null> {
    const reservation = await this.reservationRepository.findById(reservationId);
    return this.reservationRepository.update(
      (reservation) => reservation.id === reservationId,
      {  }
    );
  }
}
