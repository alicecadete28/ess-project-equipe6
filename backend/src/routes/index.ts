import { Express, Router } from 'express';
import { di } from '../di';
import FavoritesController from '../controllers/favorites.controller';
import FavoriteService from '../services/favorite.service';
import SavedController from '../controllers/saved.controller';
import SavedService from '../services/saved.service';
import { AvaliarAcomodacao } from '../controllers/avaliation.controller';

import { buscarAcomodacoes } from '../controllers/findReservation.controller';
import { filtrarAcomodacoes } from '../controllers/filter.controller';
import { ordenarAcomodacoes } from '../controllers/order.controller';
import { AuthController } from '../controllers/auth.controller';
import { AuthService } from '../services/auth.service';
import RoomController from '../controllers/room.controller';
import RoomService from '../services/room.service';
import {
  getReservationsByRoom,
  getReservationsByPF,
} from '../controllers/reservationlist.controller';
import ReservationController from '../controllers/reservation.controller';
import ReservationService from '../services/reservation.service';

const router = Router();
const prefix = '/api';

router.get('/api/buscar-acomodacoes', buscarAcomodacoes);
router.get('/api/filtrar-acomodacoes', filtrarAcomodacoes);
router.get('/api/ordenar-acomodacoes', ordenarAcomodacoes);
router.get('/avaliar-acomodacao', AvaliarAcomodacao);
router.post('/avaliacoes', AvaliarAcomodacao);
router.get('/api/reservations/:roomId/room', getReservationsByRoom);
router.get('/api/reservations/:pfId/pf', getReservationsByPF);

export default (app: Express) => {
  app.use('/', new AuthController(router, di.getService(AuthService)).router);

  // app.use(prefix, AuthController.authenticate, (req, res) =>
  //   res.json({ test: 'logado' })
  // );

  app.use(
    prefix,
    new AuthController(router, di.getService(AuthService)).router
  );

  // router.use(AuthController.authenticate); // all routes below line is authenticate, if you want to remove authtetication place the function above this line

  app.use(
    prefix,
    new FavoritesController(router, di.getService(FavoriteService)).router
  );

  app.use(
    prefix,
    new RoomController(router, di.getService(RoomService)).router
  );

  app.use(
    prefix,
    new SavedController(router, di.getService(SavedService)).router
  );

  app.use(prefix, AuthController.authenticate);

  app.use(
    prefix,
    new ReservationController(router, di.getService(ReservationService)).router
  );
};
