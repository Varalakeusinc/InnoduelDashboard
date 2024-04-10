import { Router } from "express";
import { getIdeas } from "../controllers/ideas";
import { middleware } from "../utils/middleware";

const router = Router();

// Ideas
router.get(
	"/:companyId/all",
	middleware.requireAuth,
	middleware.requireAdmin,
	getIdeas
);

export default router;
