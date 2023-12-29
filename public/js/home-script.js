document.addEventListener("DOMContentLoaded", function () {
	const fileUpload = document.getElementById("file-upload");
	const iconUpload = document.querySelector("label i");
	const textFile = document.querySelector(".file-name");
	const submitButton = document.querySelector(".btn-submit");

	if (fileUpload.files.length <= 0) {
		submitButton.disabled = true;
	} else {
		submitButton.disabled = false;
	}

	fileUpload.addEventListener("change", function () {
		if (fileUpload.files.length > 0) {
			textFile.textContent = fileUpload.files[0].name;
			textFile.style.color = "#219be1";
			submitButton.disabled = false;
			iconUpload.classList.add("active");
		} else {
			textFile.textContent = "No file chosen yet!";
		}
	});
});
