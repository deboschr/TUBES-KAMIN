const wrapper = document.querySelector('.wrapper');
const loginLink = document.querySelector('.login-link');
const registerLink = document.querySelector('.register-link');
const btnPopUp = document.querySelector('.login-popup');
const iconClose = document.querySelector('.icon-close');

registerLink.addEventListener('click', () => {
    wrapper.classList.add('active');
});

loginLink.addEventListener('click', () => {
    wrapper.classList.remove('active');
});

btnPopUp.addEventListener('click', () => {
    wrapper.classList.add('active-popup');
});

iconClose.addEventListener('click', () => {
    wrapper.classList.remove('active-popup');
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