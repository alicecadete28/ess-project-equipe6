import { Request, Response, Router } from 'express';
import { AuthService } from '../services/auth.service';
import { Result, SuccessResult } from '../utils/result';

export class AuthController {
  private prefix: string = '';
  public router: Router;

  constructor(router: Router, private readonly authService: AuthService) {
    this.router = router;
    this.initRoutes();
  }

  private initRoutes() {
    this.router.post(
      '/login',
      this.validateLogin.bind(this),
      this.login.bind(this)
    );

    this.router.post(
      `/register/:type`,
      this.validateRegister.bind(this),
      this.register.bind(this)
    );
  }

  private async login(req: Request, res: Response) {
    const { email, password } = req.body;

    const token = await this.authService.login(email, password);

    return new SuccessResult({
      msg: Result.transformRequestOnMsg(req),
      data: { token },
    }).handle(res);
  }

  private async register(req: Request, res: Response) {
    const { type } = req.params;
    const data = req.body;

    await this.authService.register(data, type);

    return new SuccessResult({
      msg: Result.transformRequestOnMsg(req),
      data: 'Cadastro realizado com sucesso',
      code: 201,
    }).handle(res);
  }

  static authenticate(req: Request, res: Response, next: any) {
    const token = req.headers['authorization'];

    if (!token) return res.status(401).json({ error: 'Token not provided' });

    const { id, type } = AuthService.validateToken(token.split(' ')[1]);

    req.body.userId = id;
    req.body.role = type;
    next();
  }

  private async validateLogin(req: Request, res: Response, next: any) {
    const { email, password } = req.body;

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!email) {
      return res.status(400).json({ error: 'Email é obrigatório' });
    }

    if (!password) {
      return res.status(400).json({ error: 'Senha é obrigatória' });
    }

    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Email inválido' });
    }

    next();
  }

  private async validateRegister(req: Request, res: Response, next: any) {
    const { type } = req.params;

    const data = req.body;
    if (type === 'pf') this.validatePf(data, res);
    else this.validatePj(data, res);

    next();
  }

  private validatePf(data: any, res: Response) {
    const { name, phone, cpf, birth_date } = data.client;

    const { email, password } = data.user;

    const only_number = /^\d+$/;

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!name) {
      res.status(400).json({ error: 'Nome é obrigatório' });
    }

    if (!cpf) {
      res.status(400).json({ error: 'CPF  é obrigatório' });
    }

    if (!birth_date) {
      res.status(400).json({ error: 'Data de nascimento  é obrigatório' });
    }

    if (!phone) {
      res.status(400).json({ error: 'Telefone  é obrigatório' });
    }

    if (!only_number.test(phone)) {
      res.status(400).json({ error: 'Telefone inválido' });
    }

    if (!only_number.test(cpf)) {
      res.status(400).json({ error: 'CPF inválido' });
    }

    if (!email) {
      res.status(400).json({ error: 'Email é obrigátorio' });
    }

    if (!password) {
      res.status(400).json({ error: 'Senha é obrigátorio' });
    }

    if (!emailRegex.test(email)) {
      res.status(400).json({ error: 'Email inválido' });
    }
  }

  private validatePj(data: any, res: Response) {
    const { name, phone, cnpj, stars, cep } = data.client;

    const only_number = /^\d+$/;

    if (!name) {
      res.status(400).json({ error: 'Nome é obrigatório' });
    }

    if (!cnpj) {
      res.status(400).json({ error: 'CNPJ  é obrigatório' });
    }
    if (!phone) {
      res.status(400).json({ error: 'Telefone  é obrigatório' });
    }

    if (!cep) {
      res.status(400).json({ error: 'CEP é obrigatório' });
    }

    if (!stars) {
      res.status(400).json({ error: 'Estrelas é obrigatório' });
    }

    if (!only_number.test(phone)) {
      res.status(400).json({ error: 'Telefone inválido' });
    }

    if (!only_number.test(cnpj)) {
      res.status(400).json({ error: 'CNPJ inválido' });
    }
  }

  static checkRole(role: string) {
    return (req: Request, res: Response, next: any) => {
      if (req.body.role !== role) {
        return res.status(403).json({ error: 'Unauthorized' });
      }
      next();
    };
  }
}
