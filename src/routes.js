import express from "express";

import {
	test_sign_page,
	test_signing,
	verify_sign,
} from "./controllers/test-sign-controller.js";
import { document_verification_page } from "./controllers/document-verification-controller.js";
import { document_management_page } from "./controllers/document-management-controller.js";
import { document_sign_page } from "./controllers/document-sign-controller.js";
import { home_page, redirect_page } from "./controllers/home-controller.js";
import {
	login_page,
	login_user,
	register_user,
} from "./controllers/login-register-controller.js";
const router = express.Router();

// Get routes
router.get("/", redirect_page);
router.get("/login-register", login_page);
router.get("/digital-signature", home_page);
router.get("/document-management", document_management_page);
router.get("/document-signing", document_sign_page);
router.get("/document-verification", document_verification_page);

router.post("/register", register_user);
router.post("/login", login_user);

router.get("/test-sign", test_sign_page);
router.get("/test-verifikasi", test_signing);
router.post("/test-sign", verify_sign);
export default router;
