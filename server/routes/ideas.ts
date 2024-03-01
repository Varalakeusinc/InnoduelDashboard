import { Router } from "express";
import { getIdeas } from "../controllers/ideas";

const router = Router();

// Ideas
router.get("/", getIdeas);

export default router;
