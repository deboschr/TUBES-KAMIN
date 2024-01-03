document.addEventListener("DOMContentLoaded", function () {
	const fileTarget = JSON.parse(
		document.querySelector(".file-target").getAttribute("get-data")
	);

	const btnSign = document.querySelector(".btn-sign");
	const btnVerify = document.querySelector(".btn-verify");
	const btnSend = document.querySelector(".btn-send");

	btnSign.addEventListener("click", function () {
		{
			$.ajax({
				url: "/document-management-detail",
				method: "POST",
				data: {
					action: "sign",
					id_document: fileTarget.id_document,
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
				url: "/document-management-detail",
				method: "POST",
				data: {
					action: "verify",
					id_document: fileTarget.id_document,
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

	btnSend.addEventListener("click", function () {
		const sendDiv = document.querySelectorAll(".user-name");
		const dataSend = [];

		sendDiv.forEach((user) => {
			const data = {
				id_document: fileTarget.id_document,
				receiver: user.getAttribute("id-user"),
			};

			dataSend.push(data); // Use push to add elements to the array
		});

		// Sending data as JSON using AJAX
		$.ajax({
			url: "/document-management-send",
			method: "POST",
			data: JSON.stringify({ dataSends: dataSend }), // Sending data as JSON
			contentType: "application/json", // Specify content type as JSON
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
	});

	setPageValue(fileTarget);
});

function setPageValue(fileTarget) {
	const signingStatus = document.querySelector(".signing-status");
	const verifyStatus = document.querySelector(".verify-status");
	const docDisplay = document.querySelector("#doc-display");
	const ownerName = document.querySelector("#owner-name");
	const ownerEmail = document.querySelector("#owner-email");
	const senderName = document.querySelector("#sender-name");
	const senderEmail = document.querySelector("#sender-email");

	signingStatus.innerHTML = fileTarget.signing_status;
	verifyStatus.innerHTML = fileTarget.verify_status;
	docDisplay.src = "doc/" + fileTarget.document_name;
	ownerName.innerHTML = fileTarget.owner_name;
	ownerEmail.innerHTML = fileTarget.owner_email;
	senderName.innerHTML = fileTarget.sender_name;
	senderEmail.innerHTML = fileTarget.sender_email;

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
