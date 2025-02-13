import { Express, Router } from 'express';
import { di } from '../di';
import TestController from '../controllers/test.controller';
import TestService from '../services/test.service';
import { buscarAcomodacoes } from '../controllers/findReservation.controller';
import { filtrarAcomodacoes } from '../controllers/filter.controller';
import { ordenarAcomodacoes } from '../controllers/order.controller';
import reservationRoutes from './reservation.routes';
import { AuthController } from '../controllers/auth.controller';
import { AuthService } from '../services/auth.service';

const router = Router();
const prefix = '/api';

router.get('/buscar-acomodacoes', buscarAcomodacoes);
router.get('/filtrar-acomodacoes', filtrarAcomodacoes);
router.get('/ordenar-acomodacoes', ordenarAcomodacoes);


export default (app: Express) => {
  app.use('/', new AuthController(router, di.getService(AuthService)).router);

  app.use(prefix, AuthController.authenticate, (req, res) =>
    res.json({ test: 'logado' })
  );

  app.use('/api', reservationRoutes);
};

