export const isAuthenticated = (req, res, next) => {
	if (req.session && req.session.loginData) {
		next();
	} else {
		res.redirect("/login-register");
	}
};
