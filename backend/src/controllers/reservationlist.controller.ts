import { Request, Response } from 'express';
import ReservationService from '../services/reservation.service';
import RoomService from '../services/room.service';
import RoomRepository from '../repositories/room.repository';
import PjRepository from '../repositories/pj.repository';

const reservationService = new ReservationService();
const roomRepository = new RoomRepository();
const pjRepository = new PjRepository();
const roomService = new RoomService(roomRepository, pjRepository);

//Listar reservas de um quarto
export async function getReservationsByRoom(req: Request, res: Response){
  try{
    const { roomId } = req.params;
    const room = await roomService.getRoom(roomId);
    if (!room) return res.status(404).json({ error: 'Quarto não encontrado' });

    const reservations = await reservationService.getReservationByRoomId(roomId as string);
    // if (reservations?.length === 0) return res.status(400).json({ error: 'Reservas não encontradas' });
    res.json(reservations);
  } catch (error) {
    res.status(400).json({error : (error as Error).message});
  }
}

export async function getReservationsByPF(req: Request, res: Response){
  try{
    const { pfId } = req.params;

    const reservations = await reservationService.getReservationByPFId(pfId as string);
    res.json(reservations);
  } catch (error) {
    res.status(400).json({error : (error as Error).message});
  }
}
