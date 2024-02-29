import { Router } from "express";
import { getVotes } from "../controllers/votes";

const router = Router();

// Votes
router.get("/", getVotes);

export default router;
