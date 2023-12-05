import express from "express";

import { document_management_page } from "./controllers/document-management-controller.js";
import { document_sign_page } from "./controllers/document-sign-controller.js";
import { home_page } from "./controllers/home-controller.js";
import { login_page, login_user, register_user } from "./controllers/login-register-controller.js";
import { test_page } from "./controllers/test-controller.js";
const router = express.Router();

// Get routes
router.get("/", test_page);
router.get("/login-register", login_page);
router.get("/digital-signature", home_page);
router.get("/document-management", document_management_page);
router.get("/document-sign", document_sign_page);

router.post("/register", register_user);
router.post("/login", login_user);

export default router;

