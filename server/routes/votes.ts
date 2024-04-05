import { Router } from "express";
import { getVotesByCompanyId } from "../controllers/votesAll";
import { getVoteDistributionByCompanyId } from "../controllers/voteDistributionAll";
import { getVoteDistributionByCompanyAndArena } from "../controllers/voteDistributionbyArena";
import { getVoteDistributionCompare } from "../controllers/voteDistributionCompare";
import { middleware } from "../utils/middleware";

const router = Router();

// Votes
router.get("/:company_id/all", middleware.requireAuth, getVotesByCompanyId);
router.get("/:company_id/distribution", middleware.requireAuth, getVoteDistributionByCompanyId);
router.get("/:company_id/:arena_id/distribution", middleware.requireAuth, getVoteDistributionByCompanyAndArena);
router.get("/:company_id/:arena_ids/distribution/compare", middleware.requireAuth, getVoteDistributionCompare);

export default router;
