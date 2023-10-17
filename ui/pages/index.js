const FEED_HTML_PAGE = "./feed.HTML"
const MANGER_HOST = `127.0.0.1`;
const MANGER_PORT = 8001;
const MANGER_API_URL = `http://${MANGER_HOST}:${MANGER_PORT}`;

const loginBtn = document.querySelector('.loginBtn');

var username = document.querySelector('.username');
var password = document.querySelector('.password');

var login = async () => {
  loginBtn.addEventListener('click', async () => {
    if (await isLogin(username.value, password.value)) {
      localStorage.setItem("username", username.value);
      localStorage.setItem("password", password.value);
      window.location.href = FEED_HTML_PAGE;
    } else {
      console.log("password worng"); //TODO: RAISE AN ERROR
    }
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
  var isUserLogined = ''

  var res = await fetch(`${MANGER_API_URL}/users/login`, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(body)
  });
  var data = await res.json();

  return data.success
}

login();










