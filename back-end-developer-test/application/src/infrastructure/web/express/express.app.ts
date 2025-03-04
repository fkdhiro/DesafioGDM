import express, { Application } from 'express';
import userRoutes from './routes/user.routes';
import { corsMiddleware } from '../cors/cors.service';

const createExpressApp = (app: Application): void => {
  app.use(express.json());
  app.use(corsMiddleware);
  app.use(userRoutes);
};

export { createExpressApp };
