import { Router } from "express";
import { loginUser } from "../controllers/login";

const router = Router();

router.post("/login", loginUser);

export default router;
