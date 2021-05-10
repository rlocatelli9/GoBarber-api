import 'reflect-metadata';
import cors from 'cors';

import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';

import uploadConfig from '@config/uploadConfig';
import AppError from '@shared/errors/AppError';
import routes from './routes';

import '@shared/infra/typeorm';
import '@shared/container';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/files', express.static(uploadConfig.directory));
app.use(routes);

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
