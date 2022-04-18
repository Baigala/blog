import { registerUser } from "./controller.js";
import { resetForm} from './views.js';

const form = document.getElementById("form");
const username = document.getElementById("username");
const number = document.getElementById("number");
const email = document.getElementById("email");
const password = document.getElementById("password");
const passwordConfirm = document.getElementById("passwordConfirm");
const togglePassword = document.getElementById("togglePassword");

const regName = /[a-z]*(\s)[a-z]{2,19}/i;
const regNumber = /[0-9]{8}/;
const regPass = /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W)(?=.{8,})/;
const regEmail =
/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


togglePassword.addEventListener("click", function (e) {
  const type = password.getAttribute("type") === "password" ? "text" : "password";
  password.setAttribute("type", type);
  this.classList.toggle("bi-eye");
});

form.addEventListener("submit", (e) => {
    e.preventDefault();
    checkInputs();
    if(
        username.value.trim() !== '' &&
        number.value.trim() !== '' &&
        email.value.trim() !== '' &&
        password.value.trim() !== '' &&
        passwordConfirm.value.trim() !== '' &&
        regName.test(username.value.trim()) &&
        regNumber.test(number.value.trim()) &&
        regEmail.test(email.value.trim()) &&
        regPass.test(password.value.trim()) &&
        password.value === passwordConfirm.value
    ) {
            registerUser({
                username: username.value,
                email: email.value,
                number: number.value,
                password: password.value
            });

            swal('Амжилттай бүртгэгдлээ' , {
                icon: 'success'
            })
            resetForm(username , number,  email , passwordConfirm , password);
    }

});

function checkInputs() {
    const usernameValue = username.value.trim();
    const numberValue = number.value.trim();
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();
    const passwordConfirmValue = passwordConfirm.value.trim();
  if (regName.test(usernameValue)) {
    setSuccessFor(username);
  } else if (usernameValue === "") {
    setErrorFor(username, "Овог нэрээ оруулна уу");
  } else {
    setErrorFor(username, "Овог нэр 2 үеээс тогтсон байна.");
  }

  if (numberValue === "") {
    setErrorFor(number, "Утасны дугаараа оруулна уу.");
  } else if (!regNumber.test(numberValue)) {
    setErrorFor(number, "8 оронтой тооноос тогтсон байнав.");
  } else {
    setSuccessFor(number);
  }

  if (emailValue === "") {
    setErrorFor(email, "И-мэйл хоосон байна.");
  } else if (!regEmail.test(emailValue)) {
    setErrorFor(email, "Зөв мэйл хаягаа оруулна уу.");
  } else {
    setSuccessFor(email);
  }

  if (passwordValue === "") {
    setErrorFor(password, "Нууц үг хоосон байна.");
  } else if (!regPass.test(passwordValue)) {
    setErrorFor(password, "8-с дээш тэмдэгт тоо том үсэг тэмдэгт оруулна ");
  } else {
    setSuccessFor(password);
  }

  if (passwordConfirmValue === "") {
    setErrorFor(passwordConfirm, "Нууц үг хоосон байна.");
  } else if (passwordValue !== passwordConfirmValue) {
    setErrorFor(passwordConfirm, "Нууц үг таарахгүй байна.");
  } else {
    setSuccessFor(passwordConfirm);
  }
}

function setErrorFor(input, message) {
  const formControl = input.parentElement;
  const small = formControl.querySelector("small");
  formControl.className = "form-control error";
  small.innerText = message;
}

function setSuccessFor(input) {
  console.log( "success",input)
}