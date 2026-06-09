import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../config/jwt';
import { env } from '../config/env';

export function authMiddleware(req: Request, res: Response, next: NextFunction): void {
  const token = req.cookies?.[env.cookieName];

  if (!token) {
    res.status(401).json({ success: false, message: 'Authentication required' });
    return;
  }

  try {
    const payload = verifyToken(token);
    req.user = payload;
    next();
  } catch {
    res.status(401).json({ success: false, message: 'Invalid or expired token' });
  }
}
