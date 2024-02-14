import express, {
  type Application,
  type Request,
  type Response,
} from "express";

import cors from "cors";
import { middleware } from "./utils/middleware";
// import { logger } from './utils/logger'
import testRoutes from "./routes/test";

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

// Routes
app.use("/test", testRoutes);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

export default app;
