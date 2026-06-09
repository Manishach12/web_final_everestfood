import { Response } from 'express';
import { signToken, JwtPayload } from '../config/jwt';
import { env } from '../config/env';

export function setAuthCookie(res: Response, payload: JwtPayload): void {
  const token = signToken(payload);

  res.cookie(env.cookieName, token, {
    httpOnly: true,
    secure: env.isProduction,
    sameSite: env.isProduction ? 'strict' : 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000,
    path: '/',
  });
}

export function clearAuthCookie(res: Response): void {
  res.clearCookie(env.cookieName, {
    httpOnly: true,
    secure: env.isProduction,
    sameSite: env.isProduction ? 'strict' : 'lax',
    path: '/',
  });
}
