import express from "express";
import { editVideoManually } from "../controllers/manualVideoController.js";

const router = express.Router();

router.post("/edit", editVideoManually);

export default router;
