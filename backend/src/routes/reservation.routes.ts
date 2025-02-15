import express from 'express';
import { createReservation, confirmReservation, updateReservationDates, updateReservationGuests } from '../controllers/reservation.controller';

const router = express.Router();

router.post('/reservations', createReservation);
router.patch('/reservations/:reservationId/confirm', confirmReservation);
router.patch('/reservations/:reservationId/dates', updateReservationDates);
router.patch('/reservations/:reservationId/guests', updateReservationGuests);

export default router;
