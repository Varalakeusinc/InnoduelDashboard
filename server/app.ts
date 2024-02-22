import express, {
  type Application,
  type Request,
  type Response
} from 'express';
import swaggerUi from 'swagger-ui-express';
import yaml from 'yamljs';

import cors from 'cors';
import { middleware } from './utils/middleware';
// import { logger } from './utils/logger'
import arenaRoutes from './routes/arena';

const swaggerDocument = yaml.load('./swagger.yaml');

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger);

app.get('/', (req: Request, res: Response) => {
  res.send('Backend is working!');
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes
app.use('/arena', arenaRoutes);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

export default app;
