const wrapper = document.querySelector('.wrapper');
const loginLink = document.querySelector('.login-link');
const registerLink = document.querySelector('.register-link');

registerLink.addEventListener('click', () => {
    wrapper.classList.add('active');
});

loginLink.addEventListener('click', () => {
    wrapper.classList.remove('active');
});

const inputFields = document.querySelectorAll(".input-box input");

inputFields.forEach((inputField) => {
    inputField.addEventListener("input", function () {
        const label = this.nextElementSibling;

        if (this.value !== "") {
            label.style.top = "-5px";
        } else {
            label.style.top = "50%";
        }
    });
});
