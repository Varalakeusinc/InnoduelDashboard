import { Router } from "express";
import { getUsers } from "../controllers/users";

const router = Router();

// Ideas
router.get("/", getUsers);

export default router;
