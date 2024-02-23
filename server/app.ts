import cors from 'cors';
import express, { type Application, type NextFunction, type Request, type Response } from 'express';
import swaggerUi, { type JsonObject } from 'swagger-ui-express';
import yaml from 'yamljs';
import arenaRoutes from './routes/arenas';
import { middleware } from './utils/middleware';

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger);

app.use('/api-docs', swaggerUi.serve, (req: Request, res: Response, next: NextFunction) => {
  const swaggerDocument = yaml.load('./swagger.yaml') as JsonObject;
  swaggerUi.setup(swaggerDocument)(req, res, next);
});

app.use('/api/arenas', arenaRoutes);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

export default app;
