import { Router } from "express";
import { getById } from "../controllers/arenasById";
import { getArenas } from "../controllers/arenas";
import { compareArenas } from "../controllers/compareArenas";
import { getIdeasOfArena } from "../controllers/arenaIdeas";
import { getArenaWinRateTrends } from "../controllers/arenaWinRateTrends";

const router = Router();

// Arenas
router.get("/:companyId/arenas", getArenas);
router.get("/:companyId/compare", compareArenas);
router.get("/:companyId/:id", getById);
router.get("/:companyId/:arenaId/ideas", getIdeasOfArena);
router.get("/:companyId/:arenaId/win_rate/trends", getArenaWinRateTrends);

export default router;
