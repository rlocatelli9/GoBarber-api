import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from '@config/authConfig';

import AppError from '@shared/errors/AppError';

interface IRequestToken {
  iat: number;
  exp: number;
  sub: string;
}

export default function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('É necessário o token de autorização.', 401);
  }

  const [, token] = authHeader.split(' ');

  try {
    const decodedToken = verify(token, authConfig.jwt.secret);

    const { sub } = decodedToken as IRequestToken;

    request.user = {
      id: sub,
    };

    return next();
  } catch (error) {
    throw new AppError('Token inválido.', 401);
  }
}
