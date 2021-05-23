import 'reflect-metadata';
import 'dotenv/config';

import cors from 'cors';
import { errors } from 'celebrate';

import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';

import uploadConfig from '@config/uploadConfig';
import AppError from '@shared/errors/AppError';
import rateLimiter from './middlewares/rateLimitMiddleware';
import routes from './routes';

import '@shared/infra/typeorm';
import '@shared/container';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/files', express.static(uploadConfig.uploadsFolder));
app.use(rateLimiter);
app.use(routes);
app.use(errors());

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'Error',
      code: err.statusCode,
      error_description: err.message,
    });
  }

  return response.status(500).json({
    status: 'Error',
    code: 500,
    error_description: 'Erro interno do servidor',
  });
});

app.listen(3333, () => {
  console.log('🚀 Server started on port 3333!');
});
