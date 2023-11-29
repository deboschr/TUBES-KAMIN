import express from "express";

import { document_management_page } from "./controllers/document-management-controller.js";
import { document_send_page } from "./controllers/document-send-controller.js";
import { document_sign_page } from "./controllers/document-sign-controller.js";
import { document_upload_page } from "./controllers/document-upload-controller.js";
import { home_page } from "./controllers/home-controller.js";
import { login_page } from "./controllers/login-controller.js";
import { register_page } from "./controllers/register-controller.js";
import { test_page } from "./controllers/test-controller.js";
const router = express.Router();

// Get routes
router.get("/", test_page);
router.get("/login", login_page);
router.get("/register", register_page);
router.get("/digital-signature", home_page);
router.get("/document-management", document_management_page);
router.get("/document-send", document_send_page);
router.get("/document-sign", document_sign_page);
router.get("/document-upload", document_upload_page);

export default router;
