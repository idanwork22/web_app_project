// popover
var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
  return new bootstrap.Popover(popoverTriggerEl);
});

// Gender Select
if (window.location.pathname === "/") {
  const radioBtn1 = document.querySelector("#flexRadioDefault1");
  const radioBtn2 = document.querySelector("#flexRadioDefault2");
  const radioBtn3 = document.querySelector("#flexRadioDefault3");
  const genderSelect = document.querySelector("#genderSelect");

  radioBtn1.addEventListener("change", () => {
    genderSelect.classList.add("d-none");
  });
  radioBtn2.addEventListener("change", () => {
    genderSelect.classList.add("d-none");
  });
  radioBtn3.addEventListener("change", () => {
    genderSelect.classList.remove("d-none");
  });
}



const MANGER_HOST = `127.0.0.1`;
const MANGER_PORT = 8001;
const MANGER_API_URL = `http://${MANGER_HOST}:${MANGER_PORT}/`;

const loginBtn = document.querySelector('.loginBtn');


var login = async () => {
  var username = document.querySelector('.username');
  var password = document.querySelector('.password');

  loginBtn.addEventListener('click', async () => {
    await isLogin(username, password)
  });

}

async function isLogin(username, password) {
  var headers = {
    'Content-Type': 'application/json' // Specify the content type as JSON
  }
  var body = {
    "username": username,
    "password": password
  }
  var isUserLogined=''

  const response = await fetch(`${MANGER_API_URL}/users/login`, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(body)
  }).then(response => {
    if (response.success) {
      return response.json();
    }
    throw new Error('Network response was not ok.');
  }).then(data => {
    isUserLogined = data.success
    console.log(data);
  })
    .catch(error => {
      console.error('There has been a problem with your fetch operation:', error);
    });
  return isUserLogined
  // var data = await response.json();
}

login();










