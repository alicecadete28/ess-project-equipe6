import { Request, Response, Router } from 'express';
import { AuthService } from '../services/auth.service';

export class AuthController {
  private prefix: string = '';
  public router: Router;

  constructor(router: Router, private readonly authService: AuthService) {
    this.router = router;
    this.initRoutes();
  }

  private initRoutes() {
    this.router.post('/login', (req: Request, res: Response) =>
      this.login(req, res)
    );

    this.router.post(`/register/:type`, (req: Request, res: Response) =>
      this.register(req, res)
    );
  }

  private async login(req: Request, res: Response) {
    const { email, password } = req.body;

    try {
      const token = await this.authService.login(email, password);

      return res.json({ token });
    } catch (error: any) {
      return res.status(401).json({ error: error.message });
    }
  }

  private async register(req: Request, res: Response) {
    const { type } = req.params;
    const data = req.body;

    try {
      await this.authService.register(data, type);

      return res.status(201).json({ message: 'User created' });
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  static authenticate(req: Request, res: Response, next: any) {
    const token = req.headers['authorization'];

    if (!token) return res.status(401).json({ error: 'Token not provided' });

    const { id } = AuthService.validateToken(token.split(' ')[1]);

    req.body.userId = id;
    console.log('User ID:', id);


    next();
  }
}
