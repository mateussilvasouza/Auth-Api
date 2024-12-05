import type * as express from 'express';
import { JwtPayload } from 'jsonwebtoken';
import { RoleType } from '../model/user.model';

interface PersonalJwtPayload extends JwtPayload{
  role: 'admin' | 'studant'
}
declare global {
  namespace Express {
    interface Request {
      user?: PersonalJwtPayload
    }
  }
}
