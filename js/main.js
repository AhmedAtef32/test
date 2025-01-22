// Start Definition of variables

let signInEmailInput = document.getElementById("signInEmail");
let signInPasswordInput = document.getElementById("signInPassword");
let incorrect = document.querySelector(".incorrect");

let signUpNameInput = document.getElementById("signUpName");
let signUpEmailInput = document.getElementById("signUpEmail");
let signUnPasswordInput = document.getElementById("signUnPassword");

let usersAccounts = [];

let cardWelcome = document.querySelector("#cardWelcome");
let nameuser = [];

let isEmailExists = 0;

let hide =document.querySelector(".hide")
// end Definition of variables

if (localStorage.getItem("Accounts") != null) {
  usersAccounts = JSON.parse(localStorage.getItem("Accounts"));
}

if (localStorage.getItem("UsersName") != null) {
  nameuser = JSON.parse(localStorage.getItem("UsersName"));
}

/**
 * (Sign Up page)
 * this Function take Email information From user and Add it to array[users Accounts]
 */
function addAcount() {
  if (
    validation(signUpNameInput) &&
    validation(signUpEmailInput) &&
    validation(signUnPasswordInput)
  ) {
    for (let i = 0; i < usersAccounts.length; i++) {
      if (
        usersAccounts[i].accountEmail
          .toLowerCase()
          .includes(signUpEmailInput.value.toLowerCase())
      ) {
        isEmailExists = 1;
        break;
      } else {
        isEmailExists = 0;
      }
    }
    console.log(isEmailExists);

    if (isEmailExists == 0) {
      let Account = {
        accountName: signUpNameInput.value,
        accountEmail: signUpEmailInput.value,
        accountPassword: signUnPasswordInput.value,
      };

      usersAccounts.push(Account);
      localStorage.setItem("Accounts", JSON.stringify(usersAccounts));
      clear();
      window.location.href = "../index.html";
    } else {
      Swal.fire({
        icon: "error",
        title: "This email already exists",
        text: "Please Enter another email !",
      });
    }
  } else {
    Swal.fire({
      icon: "error",
      title: "Error in Account Information",
      text: "Please check that the data is correct!",
    });
  }
}

/**
 * this function Clear All inputs Form Values
 */
function clear() {
  if (document.title == "Login") {
    signInEmailInput.value = "";
    signInPasswordInput.value = "";
  } else if (document.title == "Sign Up") {
    signUpNameInput.value = "";
    signUpEmailInput.value = "";
    signUnPasswordInput.value = "";
  }
}

/**
 * This function checks whether the email and password match the database or not, and if they match, it takes me to the user page.
 */
function login() {
  if (usersAccounts == 0) {
    incorrect.classList.remove("d-none");
  } else {
    for (let i = 0; i < usersAccounts.length; i++) {
      if (
        signInEmailInput.value.toLowerCase() ==
          usersAccounts[i].accountEmail.toLowerCase() &&
        signInPasswordInput.value.toLowerCase() ==
          usersAccounts[i].accountPassword.toLowerCase()
      ) {
        nameuser.push(usersAccounts[i].accountName);
        localStorage.setItem("UsersName", JSON.stringify(nameuser));
        clear();
        window.location.href = "Login Success Page/Login-Success.html";
        break;
      } else {
        incorrect.classList.remove("d-none");
      }
    }
  }
}

/**
 * this function change User Name when he Login Success And take Array to Return Last Name login to display it
 * @param {*} newName
 */
function welcomeName(newName) {
  if (document.title == "User Page") {
    cardWelcome.innerHTML = `Welcome ${nameuser[nameuser.length - 1]} `;
  }
}
welcomeName(nameuser);

/**
 * this function Verifies the validity of the data if it is correct or not
 * @param {*} input
 * @returns
 */
function validation(input) {
  let regex = {
    signUpName: /^[A-Z][a-zA-Z]{2,10}$/,
    signUpEmail: /^.{1,}(@gmail|@Gmail){1}\.com{1}$/,
    signUnPassword: /^[A-Z]{1}\w{1,9}$/,
  };

  let isValid = regex[input.id].test(input.value);
  if (isValid) {
    input.nextElementSibling.classList.add("d-none");
  } else {
    input.nextElementSibling.classList.remove("d-none");
  }

  return isValid;
}

/**
 * this function change type input to text and if type input is text change it to password  if i Click in icon
 */
if (document.title == "Login") {
  hide.addEventListener("click" , ()=>{
    if(signInPasswordInput.type == "password"){
      signInPasswordInput.type = "text";
    }
    else if (signInPasswordInput.type == "text"){
      signInPasswordInput.type = "password";
    }
  })
}