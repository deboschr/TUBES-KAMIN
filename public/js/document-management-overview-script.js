document.addEventListener("DOMContentLoaded", function () {
	const documentsOwner = JSON.parse(
		document.querySelector(".get-documents-user").getAttribute("document-owner")
	);

	const documentsReceiver = JSON.parse(
		document
			.querySelector(".get-documents-user")
			.getAttribute("document-receiver")
	);

	const ownerBtn = document.querySelector(".btn-mine");
	const receiverBtn = document.querySelector(".btn-receive");

	// Function to toggle the 'active' class
	function toggleActiveClass(event) {
		// Remove 'active' class from all elements with class 'btn-student' or 'btn-lecturer'
		document.querySelectorAll(".btn-mine, .btn-receive").forEach((element) => {
			element.classList.remove("active");
		});

		// Add 'active' class to the clicked element
		event.target.classList.add("active");
	}

	// Event listeners for button clicks
	ownerBtn.addEventListener("click", function (event) {
		toggleActiveClass(event); // Pass the event to the function
		populateTable(documentsOwner);
	});

	receiverBtn.addEventListener("click", function (event) {
		toggleActiveClass(event); // Pass the event to the function
		populateTable(documentsReceiver);
	});

	// Simulate a click on ownerBtn to set it as default active
	ownerBtn.click();
});

function populateTable(documentData) {
	const tableBody = document.getElementById("table-body");

	tableBody.innerHTML = "";

	if (documentData && documentData.length > 0) {
		documentData.forEach((item) => {
			const row = document.createElement("tr");

			const nameCell = document.createElement("td");
			const statusSigningCell = document.createElement("td");
			const statusVerifyCell = document.createElement("td");
			const actionCell = document.createElement("td");

			nameCell.textContent = item.document_name;

			const signingDiv = document.createElement("div");
			signingDiv.classList.add("signing-status");
			signingDiv.textContent = item.signing_status;
			statusSigningCell.appendChild(signingDiv);
			if (item.signing_status === "SIGNED") {
				signingDiv.style.background = "rgb(0, 238, 159)";
			} else {
				signingDiv.style.background = "rgb(234, 61, 61)";
			}

			const verifyDiv = document.createElement("div");
			verifyDiv.classList.add("verify-status");
			verifyDiv.textContent = item.verify_status;
			statusVerifyCell.appendChild(verifyDiv);
			if (item.verify_status === "VERIFIED") {
				verifyDiv.style.background = "rgb(0, 238, 159)";
			} else {
				verifyDiv.style.background = "rgb(234, 61, 61)";
			}

			const detailDiv = document.createElement("div");
			const detailIcon = document.createElement("i");
			detailDiv.classList.add("btn-detail");
			detailIcon.classList.add("bx", "bx-detail");
			detailDiv.appendChild(detailIcon);

			const deleteDiv = document.createElement("div");
			const editIconDelete = document.createElement("i");
			deleteDiv.classList.add("btn-delete");
			editIconDelete.classList.add("bx", "bx-trash");
			deleteDiv.appendChild(editIconDelete);

			actionCell.appendChild(detailDiv);
			actionCell.appendChild(deleteDiv);

			row.appendChild(nameCell);
			row.appendChild(statusSigningCell);
			row.appendChild(statusVerifyCell);
			row.appendChild(actionCell);
			tableBody.appendChild(row);

			detailDiv.addEventListener("click", function () {
				$.ajax({
					url: "/document-management-overview",
					method: "POST",
					data: {
						action: "detail",
						id_document: item.id_document,
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
			});

			deleteDiv.addEventListener("click", function () {
				$.ajax({
					url: "/document-management-overview",
					method: "POST",
					data: {
						action: "delete",
						id_document: item.id_document,
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
			});
		});
	}
}
