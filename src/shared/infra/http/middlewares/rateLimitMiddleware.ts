import AppError from '@shared/errors/AppError';
import { Request, Response, NextFunction } from 'express';
import { RateLimiterRedis } from 'rate-limiter-flexible';

import redis from 'redis';

const redisClient = redis.createClient({
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT),
  password: process.env.REDIS_PASSWORD || undefined,
});

const rateLimiter = new RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: 'ratelimit',
  points: 5, // 10 requests
  duration: 1, // per 1 second by IP
});

const rateLimiterMiddleware = async (
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    await rateLimiter.consume(request.ip);

    return next();
  } catch (error) {
    throw new AppError('Too Many Requests', 429);
  }
};

export default rateLimiterMiddleware;
