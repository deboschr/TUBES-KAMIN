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
	document_management_overview_page,
	document_management_overview,
} from "./controllers/document-management-overview-controller.js";
import {
	document_management_detail_page,
	document_management_detail,
	document_management_send,
} from "./controllers/document-management-detail-controller.js";

const router = express.Router();

// Get routes
router.get("/", isAuthenticated, redirect_page);
router.get("/home", isAuthenticated, home_page);
router.get(
	"/document-management-detail",
	isAuthenticated,
	document_management_detail_page
);
router.get(
	"/document-management-overview",
	isAuthenticated,
	document_management_overview_page
);
router.get("/login-register", login_page);

// Post Routes
router.post("/login", login_user);
router.post("/logout", logout_user);
router.post("/register", register_user);
router.post("/document-upload", document_upload);
router.post("/document-management-send", document_management_send);
router.post("/document-management-detail", document_management_detail);
router.post("/document-management-overview", document_management_overview);

export default router;
