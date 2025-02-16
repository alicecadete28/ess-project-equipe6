import { Request, Response } from 'express';
import ReservationService from '../services/reservation.service';

const reservationService = new ReservationService();

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
