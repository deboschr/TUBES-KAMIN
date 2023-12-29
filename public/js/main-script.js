document.addEventListener("DOMContentLoaded", function () {
	const btnLogout = document.querySelector(".btn-logout");

	btnLogout.addEventListener("click", function () {
		$.ajax({
			url: "/logout",
			method: "POST",
		});
		window.location.href = "/login-register";
	});
});
