import { Router } from "express";
import { getVotesByCompanyId } from "../controllers/votesAll";
import { getVoteDistributionByCompanyId } from "../controllers/voteDistributionAll";
import { getVoteDistributionByCompanyAndArena } from "../controllers/voteDistributionbyArena";
import { getVoteDistributionCompare } from "../controllers/voteDistributionCompare";
import { middleware } from "../utils/middleware";

const router = Router();

// Votes
router.get("/:company_id/all", middleware.requireAuth, middleware.checkCompany, getVotesByCompanyId);
router.get("/:company_id/distribution", middleware.requireAuth, middleware.checkCompany, getVoteDistributionByCompanyId);
router.get("/:company_id/:arena_id/distribution", middleware.requireAuth, middleware.checkCompany, getVoteDistributionByCompanyAndArena);
router.get("/:company_id/:arena_ids/distribution/compare", middleware.requireAuth, middleware.checkCompany, getVoteDistributionCompare);

export default router;
