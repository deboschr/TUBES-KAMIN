import express from "express";

import { test_page } from "./controllers/test-controller.js";
const router = express.Router();

// Get routes
router.get("/", test_page);

export default router;
