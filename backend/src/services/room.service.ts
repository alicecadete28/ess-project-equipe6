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

  constructor(roomRepository: RoomRepository, pjRepository: PjRepository) {
    this.roomRepository = roomRepository;
    this.pjRepository = pjRepository;
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

  public async getRoomsByPj(id_pj: string): Promise<RoomModel> {
    const roomEntity = await this.roomRepository.getRoomsByPj(id_pj);

    if (!roomEntity) {
      throw new HttpNotFoundError({
        msg: 'No room found',
        msgCode: RoomServiceMessageCode.room_not_found,
      });
    }

    const roomModel = new RoomModel(roomEntity);

    return roomModel;
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
  static async buscarAcomodacoes(
    destino: string,
    checkIn: Date,
    checkOut: Date,
    qntHospedes: number
  ) {
    const roomRepository = new RoomRepository();
    const rooms = await roomRepository.getRooms(); // busca todas as acomodacoes disponiveis

    const reservationRepository = new ReservationRepository();
    const reservations = await reservationRepository.getReservations(); // busca todas as reservas

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

    const roomsAvailableDestino = roomsAvailable.filter(
      (room) => room.local === destino
    );

    if (roomsAvailableDestino.length === 0) {
      throw new Error(
        'Não há acomodações disponíveis no destino e nas datas pesquisadas.'
      );
    }

    // Quartos adequados para a quantidade de hospedes e destino
    const roomsAdequados = roomsAvailable.filter(
      (room) => room.local === destino && room.capacity >= qntHospedes
    );

    if (roomsAdequados.length === 0) {
      throw new Error(
        'Não há acomodações disponíveis para o número de pessoas informado. Tente diminuir o número de hóspedes e busque novamente.'
      );
    }
    // Ordena os quartos do menor preço para o maior
    roomsAdequados.sort((a, b) => a.price - b.price);

    return roomsAdequados;
  }
}

export default RoomService;
