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
router.get("/:companyId/arenas", middleware.requireAuth, middleware.checkCompany, getArenas);
router.get("/:companyId/find_matching_arenas/:arenaId", middleware.requireAuth, middleware.checkCompany, findMatchingArenas);
router.get("/:companyId/compare_win_rate/:arenaId1/:arenaId2", middleware.requireAuth, middleware.checkCompany, compareIdeasWinRate);
router.get("/:companyId/compare", middleware.requireAuth, middleware.checkCompany, compareArenas);
router.get("/:companyId/:id", middleware.requireAuth, middleware.checkCompany, getById);
router.get("/:companyId/:arenaId/ideas", middleware.requireAuth, middleware.checkCompany, getIdeasOfArena);
router.get("/:companyId/:arenaId/win_rate/trends", middleware.requireAuth, middleware.checkCompany, getArenaWinRateTrends);

export default router;
