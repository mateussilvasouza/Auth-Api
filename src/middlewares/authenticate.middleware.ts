import { NextFunction, Request, Response } from "express";
import { JwtPayload, TokenExpiredError, verify } from "jsonwebtoken";

const publicKey = process.env.PUBLIC_KEY;

if (!publicKey) {
  throw new Error('PUBLIC_KEY is not defined in environment variables.');
}


export const AutheticateMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    res.status(401).json({ message: 'Token missing' });
    return
  }

  try {
    const decoded = verify(token, publicKey, { algorithms: ['RS256'] }) as JwtPayload;

    if (typeof decoded.sub !== 'string' || typeof decoded.iat !== 'number' || typeof decoded.exp !== 'number') {
      res.status(403).json({ message: 'Invalid token structure' });
      return 
    }

    req.user = {
      sub: decoded.sub,
      role: decoded.role,
      iat: decoded.iat,
      exp: decoded.exp,
    };

    return next();
  } catch (err: unknown) {
    if (err instanceof TokenExpiredError) {
      res.status(401).json({ message: 'Token expired' });
      return
    }

    if (err instanceof Error) {
      res.status(403).json({ message: 'Invalid token', error: err.message });
      return
    }

    res.status(500).json({ message: 'Internal server error' });
    return
  }
};
