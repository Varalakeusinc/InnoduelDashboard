import { Router } from "express";
import { getById } from "../controllers/arenasById";
import { getArenas } from "../controllers/arenas";
import { compareArenas } from "../controllers/compareArenas";
import { getIdeasOfArena } from "../controllers/arenaIdeas";
import { getArenaWinRateTrends } from "../controllers/arenaWinRateTrends";
import { findMatchingArenas } from "../controllers/findMatchingArenas";
import { compareIdeasWinRate } from "../controllers/compareIdeasWinRate";

const router = Router();

// Arenas
router.get("/:companyId/arenas", getArenas);
router.get("/:companyId/find_matching_arenas/:arenaId", findMatchingArenas);
router.get("/:companyId/compare_win_rate/:arenaId1/:arenaId2", compareIdeasWinRate);
router.get("/:companyId/compare", compareArenas);
router.get("/:companyId/:id", getById);
router.get("/:companyId/:arenaId/ideas", getIdeasOfArena);
router.get("/:companyId/:arenaId/win_rate/trends", getArenaWinRateTrends);

export default router;
