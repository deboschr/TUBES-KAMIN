import express from "express";
import { isAuthenticated } from "./utils/authorization-util.js";
import {
	home_page,
	redirect_page,
	document_upload,
} from "./controllers/home-controller.js";
import {
	login_page,
	login_user,
	register_user,
	logout_user,
} from "./controllers/login-register-controller.js";
import {
	document_management_page,
	document_detail_page,
	document_management,
	document_detail,
} from "./controllers/document-management-controller.js";

const router = express.Router();

// Get routes
router.get("/", isAuthenticated, redirect_page);
router.get("/home", isAuthenticated, home_page);
router.get("/document-detail", isAuthenticated, document_detail_page);
router.get("/document-management", isAuthenticated, document_management_page);
router.get("/login-register", login_page);

// Post Routes
router.post("/document-management", document_management);
router.post("/document-detail", document_detail);
router.post("/document-upload", document_upload);
router.post("/register", register_user);
router.post("/login", login_user);
router.post("/logout", logout_user);

export default router;
