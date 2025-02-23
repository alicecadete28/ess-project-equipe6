import jwt from 'jsonwebtoken';

import Env from '../../src/env';

export function generateToken() {
  const token = jwt.sign(
    { id: 'asdsadsa', email: 'user@gmail.com', type: 'pf' },
    Env.JWT_SECRET,
    {
      expiresIn: '1h',
    }
  );

  return token;
}
