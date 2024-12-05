import jwt from 'jsonwebtoken';
import { RoleType } from '../model/user.model';

const privateKey = process.env.PRIVATE_KEY
const publicKey = process.env.PUBLIC_KEY

if (!privateKey || !publicKey) {
  throw new Error('PUBLIC_KEY or PRIVATE_KEY is not defined in environment variables.');
}

export interface Payload{
  userId: string;
  role: RoleType
}

export const generateToken = (authPayload: Payload): string => {
  const payload = {
    sub: authPayload.userId,
    role: authPayload.role,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 3600
  }

  return jwt.sign(payload, privateKey, { algorithm: 'RS256' })
}