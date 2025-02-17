import express from 'express';
import { getReservationsByRoom, getReservationsByPF } from '../controllers/reservationlist.controller';

const router = express.Router();

router.get('/reservations/:roomId/room', getReservationsByRoom);
router.get('/reservations/:pfId/pf', getReservationsByPF);

export default router;

