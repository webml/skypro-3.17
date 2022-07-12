const loader = document.querySelector(".loader");
const message = document.querySelector(".message");

const pinCrtForm = document.querySelector(".pincode__create-form");
const pinCrtInput = pinCrtForm.querySelector(".pincode__create-input");
const pinCrtBtn = pinCrtForm.querySelector(".pincode__create-btn");

const pinEnterForm = document.querySelector(".pincode__enter-form");
const pinEnterInput = pinEnterForm.querySelector(".pincode__enter-input");
const pinEnterBtn = pinEnterForm.querySelector(".pincode__enter-btn");
const pinEnterDel = pinEnterForm.querySelector(".pincode__enter-delete");

document.addEventListener("DOMContentLoaded", () => {
  loader.classList.add("loader_none");
});

let valid = new RegExp("^[0-9]+$");

pinCrtInput.addEventListener("input", () => {
  if (!valid.test(pinCrtInput.value)) {
    message.textContent = "Пинкод должен состоять из цифр";
    pinCrtBtn.setAttribute("disabled", "disabled");
  }

  if (valid.test(pinCrtInput.value)) {
    pinCrtBtn.removeAttribute("disabled", "disabled");
    message.innerHTML = "";
  }
});

pinCrtBtn.addEventListener("click", (event) => {
  event.preventDefault();
  localStorage.setItem("pin", pinCrtInput.value);
  message.textContent = "Пин-код сохранён";
  pinCrtForm.classList.add("form_none");
});

if (!(localStorage.getItem("pin") === null)) {  
  pinCrtForm.classList.add("form_none");
  pinEnterForm.classList.remove("form_none");

  new PincodeInput(".pincode__enter-input", {
    count: localStorage.pin.length,
    secure: true,
    previewDuration: 200,
    onInput: (value) => {
      pinEnterBtn.addEventListener("click", (event) => {
        event.preventDefault();
        if (localStorage.getItem("pin") === value) {
          message.textContent = "Добро пожаловать";
          pinEnterForm.classList.add("form_none");
        } else {
          message.textContent = "Неправильный пинкод";
        };
      });
    },
  });
}

pinEnterDel.addEventListener("click", () => {
  pinEnterForm.classList.add("form_none");
  pinCrtForm.classList.remove("form_none");
  localStorage.removeItem("pin");
});