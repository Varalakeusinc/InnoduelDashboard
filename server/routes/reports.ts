import { Router } from "express";
import { exportExcel } from "../controllers/exportExcel";

const router = Router();

// Excel export
router.get("/:company_id/excel", exportExcel);

export default router;
