import RoomEntity from '../entities/room.entity';
import RoomModel from '../models/room.model';
import RoomRepository from '../repositories/room.repository';
import ReservationRepository from '../repositories/findReservation.repository';
import PjRepository from '../repositories/pj.repository';

import { HttpNotFoundError } from '../utils/errors/http.error';

class RoomServiceMessageCode {
  public static readonly room_not_found = 'room_not_found';
}

class RoomService {
  private roomRepository: RoomRepository;
  private pjRepository: PjRepository;
  private reservationRepository: ReservationRepository;

  constructor(
    roomRepository: RoomRepository,
    pjRepository: PjRepository,
    reservationRepository: ReservationRepository
  ) {
    this.roomRepository = roomRepository;
    this.pjRepository = pjRepository;
    this.reservationRepository = reservationRepository;
  }

  public async getRooms(): Promise<RoomEntity[]> {
    const roomsEntity = await this.roomRepository.getRooms();

    const roomsModel = roomsEntity.map((room) => new RoomModel(room));

    return roomsModel;
  }

  public async getRoom(id: string): Promise<RoomModel> {
    const roomEntity = await this.roomRepository.getRoom(id);

    if (!roomEntity) {
      throw new HttpNotFoundError({
        msg: 'Room not found',
        msgCode: RoomServiceMessageCode.room_not_found,
      });
    }

    const roomModel = new RoomModel(roomEntity);

    return roomModel;
  }

  public async getRoomsByPj(id_pj: string): Promise<RoomEntity[]> {
    const roomsPjEntity = await this.roomRepository.getRoomsByPj(id_pj);

    if (
      !roomsPjEntity ||
      !Array.isArray(roomsPjEntity) ||
      roomsPjEntity.length === 0
    ) {
      throw new HttpNotFoundError({
        msg: 'No room found',
        msgCode: RoomServiceMessageCode.room_not_found,
      });
    }

    const roomsPjModel = roomsPjEntity.map((room) => new RoomModel(room));

    return roomsPjModel;
  }

  public async createRoom(data: RoomEntity): Promise<RoomModel> {
    const roomEntity = await this.roomRepository.createRoom(data);
    const roomModel = new RoomModel(roomEntity);

    return roomModel;
  }

  public async updateRoom(id: string, data: RoomEntity): Promise<RoomModel> {
    const roomEntity = await this.roomRepository.updateRoom(id, data);

    if (!roomEntity) {
      throw new HttpNotFoundError({
        msg: 'Room not found',
        msgCode: RoomServiceMessageCode.room_not_found,
      });
    }

    const roomModel = new RoomModel(roomEntity);

    return roomModel;
  }

  public async deleteRoom(id: string): Promise<void> {
    await this.roomRepository.deleteRoom(id);
  }

  //BUSCA COM FILTROS
  public async buscarAcomodacoes(
    destino: string,
    checkIn: Date,
    checkOut: Date,
    qntHospedes: number
  ): Promise<RoomEntity[] | 'no_rooms_found' | 'no_capacity_available'> {
    const rooms = await this.roomRepository.getRooms(); // busca todas as acomodacoes disponiveis

    const reservations = await this.reservationRepository.getReservations(); // busca todas as reservas

    const roomsAvailable = rooms.filter((room) => {
      const quartoComReservas = reservations.some(
        (reservation) => reservation.room_id === room.id
      ); // verifica se o id da reserva é o mesmo do quarto
      if (!quartoComReservas) {
        // quarto com 0 reservas ja entra direto na lista
        return true;
      }
      return !reservations.some(
        (reservation) =>
          reservation.room_id === room.id &&
          new Date(reservation.check_in) <= new Date(checkOut) &&
          new Date(reservation.check_out) >= new Date(checkIn)
      ); // retornou quartos com a data livre
    });

    // Filtra quartos disponíveis no destino informado
    const roomsAvailableDestino = roomsAvailable.filter(
      (room) => room.local === destino
    );

    // Caso 1: Não há acomodações disponíveis no destino e data selecionados
    if (roomsAvailableDestino.length === 0) {
      return 'no_rooms_found'; // Retorna uma flag indicando que não há quartos disponíveis
    }

    // Filtra quartos com capacidade suficiente
    const roomsAdequados = roomsAvailableDestino.filter(
      (room) => room.capacity >= qntHospedes
    );

    // Caso 2: Nenhum quarto com capacidade suficiente
    if (roomsAdequados.length === 0) {
      return 'no_capacity_available'; // Retorna uma flag específica para falta de capacidade
    }
    // Ordena os quartos do menor preço para o maior
    roomsAdequados.sort((a, b) => a.price - b.price);

    return roomsAdequados;
  }
}

export default RoomService;
