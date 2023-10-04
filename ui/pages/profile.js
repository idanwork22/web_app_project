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