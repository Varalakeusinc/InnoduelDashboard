import { Router } from "express";
import { getVotesByCompanyId } from "../controllers/votesAll";
import { getVoteDistributionByCompanyId } from "../controllers/voteDistributionAll";
import { getVoteDistributionByCompanyAndArena } from "../controllers/voteDistributionbyArena";
import { getVoteDistributionCompare } from "../controllers/voteDistributionCompare";

const router = Router();

// Votes
router.get("/:company_id/all", getVotesByCompanyId);
router.get("/:company_id/distribution", getVoteDistributionByCompanyId);
router.get("/:company_id/:arena_id/distribution", getVoteDistributionByCompanyAndArena);
router.get("/:company_id/:arena_ids/distribution/compare", getVoteDistributionCompare);

export default router;
