import { Router } from "express";
import { getCompanies } from "../controllers/companies";
import { middleware } from "../utils/middleware";

const router = Router();

// Companies
router.get("/", middleware.requireAuth, middleware.requireAdmin, getCompanies);

export default router;
