import { Express, Router } from 'express';
import { di } from '../di';
import { AuthController } from '../controllers/auth.controller';
import { AuthService } from '../services/auth.service';

const router = Router();
const prefix = '/api';

export default (app: Express) => {
  app.use('/', new AuthController(router, di.getService(AuthService)).router);

  app.use(prefix, AuthController.authenticate, (req, res) =>
    res.json({ test: 'logado' })
  );
};
