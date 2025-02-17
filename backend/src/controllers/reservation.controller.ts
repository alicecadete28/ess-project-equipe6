import Database from '../database';
import { Request, Response } from 'express';
import ReservationService from '../services/reservation.service';
import RoomService from '../services/room.service';
import RoomRepository from '../repositories/room.repository';
import PjRepository from '../repositories/pj.repository';

const reservationService = new ReservationService();
const roomRepository = new RoomRepository();
const pjRepository = new PjRepository();
const roomService = new RoomService(roomRepository, pjRepository);

//Criar uma reserva
export async function createReservation(req: Request, res: Response) {
  try {
    const { pf_id, room_id,check_in, check_out, guests, total } = req.body;
    const newReservation = await reservationService.createReservation({
      pf_id,
      room_id,
      //availability_id,
      check_in: new Date(check_in),
      check_out: new Date(check_out),
      guests,
      total,
    });

    res.status(201).json(newReservation);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
}

//Confirmar uma reserva
export async function confirmReservation(req: Request, res: Response) {
  try {
    const { reservationId } = req.params;
    const updatedReservation = await reservationService.confirmReservation(
      reservationId
    );

    if (!updatedReservation)
      return res.status(404).json({ error: 'Reserva não encontrada' });

    res.json(updatedReservation);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
}

//Alterar datas da reserva
export async function updateReservationDates(req: Request, res: Response) {
  try {
    const { reservationId } = req.params;
    const { check_in, check_out } = req.body;

    const updatedReservation = await reservationService.updateReservationDates(
      reservationId,
      new Date(check_in),
      new Date(check_out)
    );

    if (!updatedReservation)
      return res.status(404).json({ error: 'Reserva não encontrada' });

    res.json(updatedReservation);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
}

//Alterar quantidade de hóspedes
export async function updateReservationGuests(req: Request, res: Response) {
  try {
    const { reservationId } = req.params;
    const { guests } = req.body;

    const updatedReservation = await reservationService.updateReservationGuests(
      reservationId,
      guests
    );

    if (!updatedReservation)
      return res.status(404).json({ error: 'Reserva não encontrada' });

    res.json(updatedReservation);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
}

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
