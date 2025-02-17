import ReservationRepository from '../repositories/reservation.repository';
import ReservationEntity from '../entities/reservation.entity';
import { v4 as uuidv4 } from 'uuid';

export default class ReservationService {
  private reservationRepository: ReservationRepository;

  constructor() {
    this.reservationRepository = new ReservationRepository();
  }

//Criar uma nova reserva
  public async createReservation(data: Omit<ReservationEntity, 'id' | 'status' | 'rating'>): Promise<ReservationEntity> {
    const newReservation = new ReservationEntity({
      id: uuidv4(),
      ...data,
      status: 'pending', // Padrão ao criar
      rating: {stars: 0, comment:""} // Inicializa sem avaliação
    });

    return this.reservationRepository.add(newReservation);
  }

  //Confirmar reserva 
  public async confirmReservation(reservationId: string): Promise<ReservationEntity | null> {
    return this.reservationRepository.update(
      (reservation) => reservation.id === reservationId, // função de filtro procurando a reserva certa pra mudar o status
      { status: 'confirmed' }
    );
  }

  //Alterar datas da reserva
  public async updateReservationDates(reservationId: string, checkIn: Date, checkOut: Date): Promise<ReservationEntity | null> {
    return this.reservationRepository.update(
      (reservation) => reservation.id === reservationId,
      { check_in: checkIn, check_out: checkOut } 
    );
  }

  //Alterar número de hóspedes
  public async updateReservationGuests(reservationId: string, guests: number): Promise<ReservationEntity | null> {
    return this.reservationRepository.update(
      (reservation) => reservation.id === reservationId,
      { guests }
    );
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

}
