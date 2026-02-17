import { Router } from "express";
import { generateSummary } from "../controllers/summary.controller";

const router = Router();

router.post("/generate", generateSummary);

export default router;
