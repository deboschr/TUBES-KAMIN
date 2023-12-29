document.addEventListener("DOMContentLoaded", function () {
	const documentsUser = JSON.parse(
		document.querySelector(".get-documents-user").getAttribute("data-query")
	);

	// Initial population of the table with all data
	populateTable(documentsUser);
});

function populateTable(scheduleFilterData) {
	const tableBody = document.getElementById("table-body");

	tableBody.innerHTML = "";

	if (scheduleFilterData && scheduleFilterData.length > 0) {
		scheduleFilterData.forEach((item) => {
			const row = document.createElement("tr");

			const nameCell = document.createElement("td");
			const statusSigningCell = document.createElement("td");
			const statusVerifyCell = document.createElement("td");
			const actionCell = document.createElement("td");

			nameCell.textContent = item.document;

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
				const data = {
					fileID: item.id_document,
					fileName: item.document,
				};

				$.ajax({
					url: "/document-management",
					method: "POST",
					data: data,
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
