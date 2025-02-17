import { Express, Router } from 'express';
import { di } from '../di';
import FavoritesController from '../controllers/favorites.controller';
import FavoriteService from '../services/favorite.service';
import SavedController from '../controllers/saved.controller';
import SavedService from '../services/saved.service';

import { buscarAcomodacoes } from '../controllers/findReservation.controller';
import { filtrarAcomodacoes } from '../controllers/filter.controller';
import { ordenarAcomodacoes } from '../controllers/order.controller';
//import reservationRoutes from './reservation.routes';
import { AuthController } from '../controllers/auth.controller';
import { AuthService } from '../services/auth.service';
import RoomController from '../controllers/room.controller';
import RoomService from '../services/room.service';
import ReservationService from '../services/reservation.service';
import ReservationController from '../controllers/reservation.controller';

const router = Router();
const prefix = '/api';

router.get('/api/buscar-acomodacoes', buscarAcomodacoes);
router.get('/api/filtrar-acomodacoes', filtrarAcomodacoes);
router.get('/api/ordenar-acomodacoes', ordenarAcomodacoes);

export default (app: Express) => {
  // app.use('/', new AuthController(router, di.getService(AuthService)).router);

  // app.use(prefix, AuthController.authenticate, (req, res) =>
  //   res.json({ test: 'logado' })
  // );

  app.use(
    prefix,
    new RoomController(router, di.getService(RoomService)).router
  );

  app.use(
    prefix,
    new FavoritesController(router, di.getService(FavoriteService)).router
  );

  app.use(
    prefix,
    new SavedController(router, di.getService(SavedService)).router
  );
  
  //app.use(prefix, AuthController.authenticate);

  app.use(
    prefix,
    new ReservationController(router, di.getService(ReservationService)).router
  );
};

