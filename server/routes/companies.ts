import { Router } from "express";
import { getCompanies } from "../controllers/companies";

const router = Router();

// Companies
router.get("/", getCompanies);

export default router;
