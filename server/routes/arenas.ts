import { Router } from "express";
import { getById } from "../controllers/arenasById";
import { getArenas } from "../controllers/arenas";
import { compareArenas } from "../controllers/compareArenas";
import { getIdeasOfArena } from "../controllers/arenaIdeas";
import { getArenaWinRateTrends } from "../controllers/arenaWinRateTrends";
import { findMatchingArenas } from "../controllers/findMatchingArenas";
import { compareIdeasWinRate } from "../controllers/compareIdeasWinRate";
import { middleware } from "../utils/middleware";

const router = Router();

// Arenas
router.get("/:companyId/arenas", middleware.requireAuth, getArenas);
router.get("/:companyId/find_matching_arenas/:arenaId", middleware.requireAuth, findMatchingArenas);
router.get("/:companyId/compare_win_rate/:arenaId1/:arenaId2", middleware.requireAuth, compareIdeasWinRate);
router.get("/:companyId/compare", middleware.requireAuth, compareArenas);
router.get("/:companyId/:id", middleware.requireAuth, getById);
router.get("/:companyId/:arenaId/ideas", middleware.requireAuth, getIdeasOfArena);
router.get("/:companyId/:arenaId/win_rate/trends", middleware.requireAuth, getArenaWinRateTrends);

export default router;
