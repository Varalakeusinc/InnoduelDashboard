import cors from "cors";
import express, {
	type Application,
	type NextFunction,
	type Request,
	type Response,
} from "express";
import swaggerUi, { type JsonObject } from "swagger-ui-express";
import yaml from "yamljs";
import arenaRoutes from "./routes/arenas";
import companyRoutes from "./routes/companies";
import ideaRoutes from "./routes/ideas";
import userRoutes from "./routes/users";
import voteRoutes from "./routes/votes";

import { middleware } from "./utils/middleware";

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger);

app.use(
	"/api-docs",
	swaggerUi.serve,
	(req: Request, res: Response, next: NextFunction) => {
		const swaggerDocument = yaml.load("./swagger.yaml") as JsonObject;
		swaggerUi.setup(swaggerDocument)(req, res, next);
	}
);

// Arenas
app.use("/api/arenas", arenaRoutes);

// Companies
app.use("/api/companies", companyRoutes);

// Ideas
app.use("/api/ideas", ideaRoutes);

// Ideas
app.use("/api/users", userRoutes);

// Votes
app.use("/api/votes", voteRoutes);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

export default app;
