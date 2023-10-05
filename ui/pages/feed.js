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


const getCurrentDateTime = () => {
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const currentDate = new Date();
  const month = months[currentDate.getMonth()];
  const day = currentDate.getDate();
  const hours = currentDate.getHours() % 12 || 12;
  const minutes = currentDate.getMinutes();
  const period = currentDate.getHours() >= 12 ? "pm" : "am";

  const formattedDate = `${month} ${day} at ${hours}:${minutes} ${period}`;
  return formattedDate
}


//comments post btn
function postComment() {
  var allComments = document.querySelectorAll('.comments');
  var commentsCounter = document.querySelectorAll('.commentsCounter');
  var newCommentInputBtn = Array.from(document.querySelectorAll('.newCommentInputBtn'));
  var newCommentInput = Array.from(document.querySelectorAll('.newCommentInput'));


  newCommentInputBtn.forEach((commentBtn, i) => {

    commentBtn.addEventListener('click', () => {

      var author = 'John'
      var realCommnet = newCommentInput[i].value

      var newCommentObj = document.createElement('div')
      newCommentObj.className = "d-flex align-items-center my-1";

      newCommentObj.innerHTML = `<!-- comment -->
        <!-- avatar -->
        <img src="https://source.unsplash.com/random/2" alt="avatar" class="rounded-circle me-2"
          style="
              width: 38px;
              height: 38px;
              object-fit: cover;
            " />
        <!-- comment text -->
        <div class="p-3 rounded comment__input w-100">
          <p class="fw-bold m-0">${author}</p>
          <p class="m-0 fs-7 bg-gray p-2 rounded">
            ${realCommnet}
          </p>
        </div>
     `;
      var accordionItems = allComments[i].children.length
      allComments[i].insertBefore(newCommentObj,allComments[i].children[accordionItems-1])
      commentsCounter[i].innerHTML = `${accordionItems} Comments`
    });
  });

}
postComment();


//like post btn
function likeBtns() {
  var likeButtons = Array.from(document.querySelectorAll('.likeButton'));
  var likeCounter = Array.from(document.querySelectorAll('.likeCounter'));


  likeButtons.forEach((likeBtn, i) => {
    let isLiked = false;

    likeBtn.addEventListener('click', () => {
      isLiked = !isLiked;

      if (isLiked) {
        likeCounter[i].innerHTML = parseInt(likeCounter[i].innerHTML) + 1;
        likeBtn.classList.replace('text-muted', 'text-primary')
      } else {
        likeCounter[i].innerHTML = parseInt(likeCounter[i].innerHTML) - 1;
        likeBtn.classList.replace('text-primary', 'text-muted')

      }
    });
  });

}
likeBtns();

const updateDoms = () => {
  likeBtns();
}


//create new post
//upload image
const uploadImageInput = document.querySelector(".file")
const uploadedimage = document.querySelector(".uploadedimage")

var newImage = ''

uploadImageInput.addEventListener("change", () => {
  newImage = uploadImageInput.files[0]
  displayQuedImageInsideModal()
})

uploadImageInput.addEventListener("drop", (e) => {
  if (!e.dataTransfer.files[0].type.match("image")) {
    newImage = uploadImageInput.files[0]
    displayQuedImageInsideModal()
  }
})

const displayQuedImageInsideModal = () => {
  var img = `
        <div class="uploadedimage">
        <img src="${URL.createObjectURL(newImage)}" className="img-fluid rounded" style="width: 38px; height: 38px; object-fit: cover" alt="image">
        </div>
    `
  uploadedimage.innerHTML = img
}

//getting inforamtion
const newPostTextArea = document.querySelector(".newPostTextArea");
const createNewPostButton = document.querySelector(".postButton");
const createPostModal = new bootstrap.Modal('#createPostModal');
const timeline = document.querySelector(".timeline");

createNewPostButton.addEventListener("click", () => {
  createNewPost(newPostTextArea.value);
});

const createNewPost = (text) => {
  var newPost = document.createElement("div");
  var author = "John";
  if (newImage === '') {
    createPostWithoutImage(text, newPost, author)
  }
  else {
    createPostWithImage(text, newPost, author)
  }
}

var createPostWithoutImage = (text, newPost, author) => {
  newPost.className = "bg-white p-4 rounded shadow mt-3";
  newPost.innerHTML = `
  <!-- author -->
            <div class="d-flex justify-content-between">
              <!-- avatar -->
              <div class="d-flex">
                <img src="https://source.unsplash.com/collection/happy-people" alt="avatar" class="rounded-circle me-2"
                  style="width: 38px; height: 38px; object-fit: cover" />
                <div>
                  <p class="m-0 fw-bold">${author}</p>
                  <span class="text-muted fs-7">${getCurrentDateTime()}</span>
                </div>
              </div>
              <!-- edit -->
              <i class="fas fa-ellipsis-h" type="button" id="post1Menu" data-bs-toggle="dropdown"
                aria-expanded="false"></i>
              <!-- edit menu -->
              <ul class="dropdown-menu border-0 shadow" aria-labelledby="post1Menu">
                <li class="d-flex align-items-center">
                  <a class="
                        dropdown-item
                        d-flex
                        justify-content-around
                        align-items-center
                        fs-7
                      " href="#">
                    Edit Post</a>
                </li>
                <li class="d-flex align-items-center">
                  <a class="
                        dropdown-item
                        d-flex
                        justify-content-around
                        align-items-center
                        fs-7
                      " href="#">
                    Delete Post</a>
                </li>
              </ul>
            </div>
            <!-- post content -->
            <div class="mt-3">
              <!-- content -->
              <div>
                <p>
                  ${text}
                </p>
              </div>
              <!-- likes & comments -->
              <div class="post__comment mt-3 position-relative">
                <!-- likes -->
                <div class="
                      d-flex
                      align-items-center
                      top-0
                      start-0
                      position-absolute
                    " style="height: 50px; z-index: 5">
                  <div class="me-2">
                    <i class="text-primary fas fa-thumbs-up"></i>
                  </div>
                  <p class="likeCounter m-0 text-muted fs-7">0</p>
                </div>
                <!-- comments start-->
                <div class="accordion" id="accordionExample">
                  <div class="accordion-item border-0">
                    <!-- comment collapse -->
                    <h2 class="accordion-header" id="headingTwo">
                      <div class="
                            accordion-button
                            collapsed
                            pointer
                            d-flex
                            justify-content-end
                          " data-bs-toggle="collapse" data-bs-target="#collapsePost1" aria-expanded="false"
                        aria-controls="collapsePost1">
                        <p class="m-0">0 Comments</p>
                      </div>
                    </h2>
                    <hr />
                    <!-- comment & like bar -->
                    <div class="d-flex justify-content-around">
                      <div class="
                            likeButton
                            dropdown-item
                            rounded
                            d-flex
                            justify-content-center
                            align-items-center
                            pointer
                            text-muted
                            p-1
                          ">
                        <i class="fas fa-thumbs-up me-3"></i>
                        <p class="m-0">Like</p>
                      </div>
                      <div class="
                            dropdown-item
                            rounded
                            d-flex
                            justify-content-center
                            align-items-center
                            pointer
                            text-muted
                            p-1
                          " data-bs-toggle="collapse" data-bs-target="#collapsePost1" aria-expanded="false"
                        aria-controls="collapsePost1">
                        <i class="fas fa-comment-alt me-3"></i>
                        <p class="m-0">Comment</p>
                      </div>
                    </div>
                    <!-- comment expand -->
                    <div id="collapsePost1" class="accordion-collapse collapse" aria-labelledby="headingTwo"
                      data-bs-parent="#accordionExample">
                      <hr />
                      <div class="accordion-body">
                        <!-- create comment -->
                        <form class="d-flex my-1">
                          <!-- avatar -->
                          <div>
                            <img src="https://source.unsplash.com/collection/happy-people" alt="avatar"
                              class="rounded-circle me-2" style="
                                  width: 38px;
                                  height: 38px;
                                  object-fit: cover;
                                " />
                          </div>
                          <!-- input -->
                          <input type="text" class="border-0 rounded-pill bg-gray" placeholder="Write a comment" />
                        </form>
                        <!-- end -->
                      </div>
                    </div>
                  </div>
                </div>
                <!-- end -->
              </div>
            </div>
  `;
  timeline.insertBefore(newPost, timeline.children[1]);
  createPostModal.hide();
  updateDoms();
}

var createPostWithImage = (text, newPost, author) => {
  var img = URL.createObjectURL(newImage);
  newPost.className = "bg-white p-4 rounded shadow mt-3";
  newPost.innerHTML = `
  <!-- author -->
            <div class="d-flex justify-content-between">
              <!-- avatar -->
              <div class="d-flex">
                <img src="https://source.unsplash.com/collection/happy-people" alt="avatar" class="rounded-circle me-2"
                  style="width: 38px; height: 38px; object-fit: cover" />
                <div>
                  <p class="m-0 fw-bold">${author}</p>
                  <span class="text-muted fs-7">${getCurrentDateTime()}</span>
                </div>
              </div>
              <!-- edit -->
              <i class="fas fa-ellipsis-h" type="button" id="post1Menu" data-bs-toggle="dropdown"
                aria-expanded="false"></i>
              <!-- edit menu -->
              <ul class="dropdown-menu border-0 shadow" aria-labelledby="post1Menu">
                <li class="d-flex align-items-center">
                  <a class="
                        dropdown-item
                        d-flex
                        justify-content-around
                        align-items-center
                        fs-7
                      " href="#">
                    Edit Post</a>
                </li>
                <li class="d-flex align-items-center">
                  <a class="
                        dropdown-item
                        d-flex
                        justify-content-around
                        align-items-center
                        fs-7
                      " href="#">
                    Delete Post</a>
                </li>
              </ul>
            </div>
            <!-- post content -->
            <div class="mt-3">
              <!-- content -->
              <div>
                <p>
                  ${text}
                </p>
                <img src="${img}" alt="post image" class="img-fluid rounded" />
              </div>
              <!-- likes & comments -->
              <div class="post__comment mt-3 position-relative">
                <!-- likes -->
                <div class="
                      d-flex
                      align-items-center
                      top-0
                      start-0
                      position-absolute
                    " style="height: 50px; z-index: 5">
                  <div class="me-2">
                    <i class="text-primary fas fa-thumbs-up"></i>
                  </div>
                  <p class="likeCounter m-0 text-muted fs-7">0</p>
                </div>
                <!-- comments start-->
                <div class="accordion" id="accordionExample">
                  <div class="accordion-item border-0">
                    <!-- comment collapse -->
                    <h2 class="accordion-header" id="headingTwo">
                      <div class="
                            accordion-button
                            collapsed
                            pointer
                            d-flex
                            justify-content-end
                          " data-bs-toggle="collapse" data-bs-target="#collapsePost1" aria-expanded="false"
                        aria-controls="collapsePost1">
                        <p class="m-0">0 Comments</p>
                      </div>
                    </h2>
                    <hr />
                    <!-- comment & like bar -->
                    <div class="d-flex justify-content-around">
                      <div class="
                            likeButton
                            dropdown-item
                            rounded
                            d-flex
                            justify-content-center
                            align-items-center
                            pointer
                            text-muted
                            p-1
                          ">
                        <i class="fas fa-thumbs-up me-3"></i>
                        <p class="m-0">Like</p>
                      </div>
                      <div class="
                            dropdown-item
                            rounded
                            d-flex
                            justify-content-center
                            align-items-center
                            pointer
                            text-muted
                            p-1
                          " data-bs-toggle="collapse" data-bs-target="#collapsePost1" aria-expanded="false"
                        aria-controls="collapsePost1">
                        <i class="fas fa-comment-alt me-3"></i>
                        <p class="m-0">Comment</p>
                      </div>
                    </div>
                    <!-- comment expand -->
                    <div id="collapsePost1" class="accordion-collapse collapse" aria-labelledby="headingTwo"
                      data-bs-parent="#accordionExample">
                      <hr />
                      <div class="accordion-body">
                        <!-- create comment -->
                        <form class="d-flex my-1">
                          <!-- avatar -->
                          <div>
                            <img src="https://source.unsplash.com/collection/happy-people" alt="avatar"
                              class="rounded-circle me-2" style="
                                  width: 38px;
                                  height: 38px;
                                  object-fit: cover;
                                " />
                          </div>
                          <!-- input -->
                          <input type="text" class="border-0 rounded-pill bg-gray" placeholder="Write a comment" />
                        </form>
                        <!-- end -->
                      </div>
                    </div>
                  </div>
                </div>
                <!-- end -->
              </div>
            </div>
  `;
  timeline.insertBefore(newPost, timeline.children[1]);
  createPostModal.hide();
  updateDoms();

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

searchBoxWeatherBtn.addEventListener("click", () => {
  checkWeather(searchBoxWeather.value);
});

async function checkWeather(city) {
  const apiKey = "6240e45b7ed109724d1dde47b4cdd953";
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`;

  var response = await fetch(apiUrl + `&appid=${apiKey}`);
  var data = await response.json();

  if (!response.ok) {
    document.querySelector(".city").innerHTML = "City Not Found..."
    document.querySelector(".temp").innerHTML = ""
  }
  else {
    document.querySelector(".city").innerHTML = data.name
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C"

    if (data.weather[0].main == "Clouds") {
      weatherIcon.src = "../images/weather/clouds.png";
    }
    else if (data.weather[0].main == "Clear") {
      weatherIcon.src = "../images/weather/clear.png";
    }
    else if (data.weather[0].main == "Rain") {
      weatherIcon.src = "../images/weather/rain.png";
    }
    else if (data.weather[0].main == "Drizzle") {
      weatherIcon.src = "../images/weather/drizzle.png";
    }
    else if (data.weather[0].main == "Mist") {
      weatherIcon.src = "../images/weather/mist.png";
    }
    else if (data.weather[0].main == "Snow") {
      weatherIcon.src = "../images/weather/Snow.png";
    }
    else if (data.weather[0].main == "Snow") {
      weatherIcon.src = "../images/weather/Snow.png";
    }
    else {
      weatherIcon.src = "../images/weather/wind.png";
    }

    weatherIcon.hidden = false
  }
}

