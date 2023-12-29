document.addEventListener("DOMContentLoaded", function () {
	const fileTarget = JSON.parse(
		document.querySelector(".file-target").getAttribute("get-data")
	);

	const btnSign = document.querySelector(".btn-sign");
	const btnVerify = document.querySelector(".btn-verify");

	btnSign.addEventListener("click", function () {
		{
			$.ajax({
				url: "/document-detail",
				method: "POST",
				data: {
					action: "sign",
					id_document: fileTarget.doc_id,
				},
				success: function (response) {
					if (response && response.redirectUrl) {
						window.location.href = response.redirectUrl;
					} else {
						console.error("Unexpected response:", response);
					}
				},
				error: function (error) {
					console.error("Error:", error);
				},
			});
		}
	});

	btnVerify.addEventListener("click", function () {
		{
			$.ajax({
				url: "/document-detail",
				method: "POST",
				data: {
					action: "verify",
					id_document: fileTarget.doc_id,
				},
				success: function (response) {
					if (response && response.redirectUrl) {
						window.location.href = response.redirectUrl;
					} else {
						console.error("Unexpected response:", response);
					}
				},
				error: function (error) {
					console.error("Error:", error);
				},
			});
		}
	});

	setPageValue(fileTarget);
});

function setPageValue(fileTarget) {
	const signingStatus = document.querySelector(".signing-status");
	const verifyStatus = document.querySelector(".verify-status");
	const docDisplay = document.querySelector("#doc-display");

	signingStatus.innerHTML = fileTarget.status_signing;
	verifyStatus.innerHTML = fileTarget.status_verify;
	docDisplay.src = "doc/" + fileTarget.doc_name;

	if (signingStatus.innerHTML === "SIGNED") {
		signingStatus.style.background = "rgb(0, 238, 159)";
	} else {
		signingStatus.style.background = "rgb(234, 61, 61)";
	}

	if (verifyStatus.innerHTML === "VERIFIED") {
		verifyStatus.style.background = "rgb(0, 238, 159)";
	} else {
		verifyStatus.style.background = "rgb(234, 61, 61)";
	}
}
