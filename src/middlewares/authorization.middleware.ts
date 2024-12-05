
import { Request, Response, NextFunction } from 'express';

export const AuthorizationMiddleware = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user || !roles.includes(req.user.role)) {
      res.status(403).json({ message: 'Access forbidden: insufficient permissions' });
      return;
    }
    next();
  };
};
