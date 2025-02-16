import { JwtPayload as NativeJwtPayload } from 'jsonwebtoken';

export type JwtPayload = NativeJwtPayload & {
  id: string;
  email: string;
};
