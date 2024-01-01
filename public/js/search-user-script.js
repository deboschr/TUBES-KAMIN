function openModal() {
	const openModalBtn = document.querySelector(".btn-add");
	const modal = document.getElementById("modal");
	openModalBtn.addEventListener("click", function (event) {
		modal.style.display = "flex";
		document.body.classList.add("modal-open");
	});
}

function closeModal() {
	const modal = document.getElementById("modal");
	modal.style.display = "none";
	document.body.classList.remove("modal-open");
}

function setInputParticipants(id_user, name) {
	let boxReciverDiv = document.querySelector(".box-reciver");

	let fieldDiv = document.createElement("div");
	fieldDiv.classList.add("field");

	let userDiv = document.createElement("div");
	userDiv.classList.add("user-name");
	userDiv.innerHTML = name;
	userDiv.setAttribute("id-user", id_user);

	let trashDiv = document.createElement("div");
	const trashIcon = document.createElement("i");
	trashDiv.classList.add("btn-trash");
	trashIcon.classList.add("bx", "bx-trash");
	trashDiv.appendChild(trashIcon);

	fieldDiv.appendChild(userDiv);
	fieldDiv.appendChild(trashDiv);

	boxReciverDiv.appendChild(fieldDiv);

	closeModal();
}

function displayResults(results) {
	let resultList = document.querySelector(".list-result");
	// Tampilkan hasil pencarian dalam elemen list
	results.forEach(function (result) {
		let listItem = document.createElement("li");
		listItem.textContent = result.name;

		listItem.addEventListener("click", function () {
			setInputParticipants(result.id_user, result.name);
		});

		resultList.appendChild(listItem);
	});
}

document.addEventListener("DOMContentLoaded", function () {
	const dataUser = JSON.parse(
		document.querySelector(".data-user").getAttribute("get-data")
	);
	let searchInput = document.getElementById("searchInput");
	let resultList = document.querySelector(".list-result");

	openModal();

	searchInput.addEventListener("keyup", function () {
		let searchValue = this.value.trim().toLowerCase(); // Mendapatkan nilai dari input pencarian

		// Kosongkan hasil pencarian sebelum menampilkan hasil baru
		resultList.innerHTML = "";

		let matchedUsers = [];

		if (searchValue !== "") {
			matchedUsers = dataUser.filter(function (user) {
				return user.name.toLowerCase().includes(searchValue);
			});
			displayResults(matchedUsers);
		}
	});

	window.addEventListener("click", function (event) {
		if (event.target === modal) {
			modal.style.display = "none";
			document.body.classList.remove("modal-open");
		}
	});
});
