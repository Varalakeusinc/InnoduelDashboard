import { Router } from "express";
import { exportExcel } from "../controllers/exportExcel";
import { middleware } from "../utils/middleware";

const router = Router();

// Excel export
router.get("/:company_id/excel",
    middleware.requireAuth,
    middleware.requireAdmin,
    exportExcel,
);

export default router;
