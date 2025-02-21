import { Request, Response } from 'express';
import ReservationService from '../services/reservation.service';
import RoomService from '../services/room.service';
import { di } from '../di';

const roomService = di.getService(RoomService);
const reservationService = di.getService(ReservationService);

//Listar reservas de um quarto
export async function getReservationsByRoom(req: Request, res: Response) {
  try {
    const { roomId } = req.params;
    const room = await roomService.getRoom(roomId);
    if (!room) return res.status(404).json({ error: 'Quarto não encontrado' });

    const reservations = await reservationService.getReservationByRoomId(
      roomId as string
    );
    // if (reservations?.length === 0) return res.status(400).json({ error: 'Reservas não encontradas' });
    res.json(reservations);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
}

export async function getReservationsByPF(req: Request, res: Response) {
  try {
    const { pfId } = req.params;

    const reservations = await reservationService.getReservationByPFId(
      pfId as string
    );
    res.json(reservations);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
}

export async function cancelReservation(req: Request, res: Response) {
  try {
    const { reservationId } = req.params;
    await reservationService.cancelReservation(reservationId);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
}
