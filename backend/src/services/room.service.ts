import RoomEntity from '../entities/room.entity';
import RoomModel from '../models/room.model';
import OtherRepository from '../repositories/other.repository';
import RoomRepository from '../repositories/room.repository';
import { HttpNotFoundError } from '../utils/errors/http.error';

class RoomServiceMessageCode {
  public static readonly room_not_found = 'room_not_found';
}

class RoomService {
  private roomRepository: RoomRepository;
  private otherRepository: OtherRepository;

  constructor(
    roomRepository: RoomRepository,
    otherRepository: OtherRepository
  ) {
    this.roomRepository = roomRepository;
    this.otherRepository = otherRepository;
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

  public async createRoom(data: any): Promise<RoomModel> {
    const roomEntity = new RoomEntity({
      id: data.id || '',
      pj_id: data.pj_id,
      description: data.description,
      type: data.type,
      price: data.price,
      capacity: data.capacity,
      caracteristics_ids: data.caracteristics_ids || [],
    });
    const createdRoomEntity = await this.roomRepository.createRoom(roomEntity);
    const roomModel = new RoomModel(createdRoomEntity);

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
}

export default RoomService;
