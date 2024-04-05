import { Router } from "express";
import { loginUser, logoutUser } from "../controllers/login";
import {  middleware } from "../utils/middleware";

const router = Router();

router.post("/login", loginUser);
router.post("/logout", middleware.requireAuth, logoutUser);

export default router;
