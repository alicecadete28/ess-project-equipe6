import { Express, Router } from 'express';
import { di } from '../di';
import TestController from '../controllers/test.controller';
import TestService from '../services/test.service';
import { buscarAcomodacoes } from '../controllers/reservation.controller';

const router = Router();
const prefix = '/api';
router.get('/buscar-acomodacoes', buscarAcomodacoes);

export default (app: Express) => {
  app.use(
    prefix,
    new TestController(router, di.getService(TestService)).router
  );
};
