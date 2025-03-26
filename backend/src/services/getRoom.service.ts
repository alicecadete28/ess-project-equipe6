import RoomRepository from '../repositories/room.repository';
import RoomEntity from '../entities/room.entity';

class GetRoomService {
  private roomRepository: RoomRepository;

  constructor(roomRepository: RoomRepository) {
    this.roomRepository = roomRepository;
  }

  async getRoomById(id: string): Promise<RoomEntity | null> {
    try {
      const room = await this.roomRepository.getRoom(id);
      if (!room) {
        throw new Error('Room not found.');
      }
      return room;
    } catch (error) {
      console.error('Error in GetRoomService.getRoomById:', error);
      throw error;
    }
  }
}

export default GetRoomService;