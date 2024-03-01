import { Router } from "express";
import { getById } from "../controllers/arenasById";
import { getArenas } from "../controllers/arenas";
import { compareArenas } from "../controllers/compareArenas";
import { getIdeasOfArena } from "../controllers/arenaIdeas";

const router = Router();

// Arenas
router.get("/", getArenas);
router.get("/compare", compareArenas);
router.get("/:id", getById);
router.get('/:arena_id/ideas', getIdeasOfArena);

export default router;
