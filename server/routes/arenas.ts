import { Router } from "express";
import { getById } from "../controllers/arenasById";
import { getArenas } from "../controllers/arenas";
import { compareArenas } from "../controllers/compareArenas";
import { getIdeasOfArena } from "../controllers/arenaIdeas";
import { getArenaWinRateTrends } from "../controllers/arenaWinRateTrends";

const router = Router();

// Arenas
router.get("/", getArenas);
router.get("/compare", compareArenas);
router.get("/:id", getById);
router.get("/:arenaId/ideas", getIdeasOfArena);
router.get("/:arenaId/win_rate/trends", getArenaWinRateTrends);

export default router;
