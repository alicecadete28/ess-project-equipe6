import { Request, Response } from 'express';
import GetRoomService from '../services/getRoom.service';
import RoomRepository from '../repositories/room.repository';
import { di } from '../di';

const roomRepository = di.getRepository<RoomRepository>(RoomRepository);
const getRoomService = new GetRoomService(roomRepository);

export const getRoomById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    //console.log("o id:", id);
    const room = await getRoomService.getRoomById(id);
    res.status(200).json(room);
    //console.log("o quarto:", room);
  } catch (error) {
    res.status(404).json({ message: "quarto nao encontrado"});
  }
};