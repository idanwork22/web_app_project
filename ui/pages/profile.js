const MANGER_HOST = `127.0.0.1`;
const MANGER_PORT = 8001;
const MANGER_API_URL = `http://${MANGER_HOST}:${MANGER_PORT}`;


//check if user is auth else thro him to login page
const LOGIN_PAGE = "./index.html"
async function isLogin(username, password) {
  var headers = {
    'Content-Type': 'application/json' 
  }
  var body = {
    "username": username,
    "password": password
  }
  var res = await fetch(`${MANGER_API_URL}/users/login`, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(body)
  });
  var data = await res.json();
  return data.success
}

var username = localStorage.getItem("username");
var password = localStorage.getItem("password");

isLogin(username, password).then(isloginSuccess=>{
  isloginSuccess ? null : window.location.href = LOGIN_PAGE;
}) 



const editProfileForm = document.querySelector(".editProfileForm");
const editProfileUpdateButton = document.querySelector(".editProfileUpdateButton");
const profileName = document.querySelector(".profileName");


editProfileUpdateButton.addEventListener("click", () => {
    changeProfile();
});

var changeProfile = () => {
    var firstName = editProfileForm[0].value
    var lastName = editProfileForm[1].value
    var email = editProfileForm[2].value
    var password = editProfileForm[3].value

    profileName.innerHTML = `${firstName} ${lastName}`
}