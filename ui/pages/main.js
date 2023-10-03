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







// weather finder
const searchBoxWeather = document.querySelector(".searchWeather input");
const searchBoxWeatherBtn = document.querySelector(".searchWeather button"); 
const weatherIcon = document.querySelector(".weather-icon"); 


searchBoxWeather.addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    checkWeather(searchBoxWeather.value);
  }
});

searchBoxWeatherBtn.addEventListener("click", ()=>{
  checkWeather(searchBoxWeather.value);
});

async function checkWeather(city) {
  const apiKey = "6240e45b7ed109724d1dde47b4cdd953";
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`;

  var response = await fetch(apiUrl + `&appid=${apiKey}`);
  var data = await response.json();

  if (!response.ok){
    document.querySelector(".city").innerHTML = "City Not Found..."  
    document.querySelector(".temp").innerHTML = ""
  }
  else{
    document.querySelector(".city").innerHTML = data.name
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C"
  
    if(data.weather[0].main == "Clouds"){
      weatherIcon.src = "../images/weather/clouds.png";
    }
    else if(data.weather[0].main == "Clear"){
      weatherIcon.src = "../images/weather/clear.png";
    }
    else if(data.weather[0].main == "Rain"){
      weatherIcon.src = "../images/weather/rain.png";
    }
    else if(data.weather[0].main == "Drizzle"){
      weatherIcon.src = "../images/weather/drizzle.png";
    }
    else if(data.weather[0].main == "Mist"){
      weatherIcon.src = "../images/weather/mist.png";
    }
    else if(data.weather[0].main == "Snow"){
      weatherIcon.src = "../images/weather/Snow.png";
    }
    else if(data.weather[0].main == "Snow"){
      weatherIcon.src = "../images/weather/Snow.png";
    }
    else{
      weatherIcon.src = "../images/weather/wind.png";
    }

    weatherIcon.hidden = false
  }
}

