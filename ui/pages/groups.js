
//Change groups
var groupButtonsSelectors = document.querySelectorAll(".groupButtonSelect");
console.log(groupButtonsSelectors)
var selectedGroupElement = document.querySelector(".groupName");

console.log(selectedGroupElement)
groupButtonsSelectors.forEach(function (button) {
  button.addEventListener("click", () => {
    selectedGroupElement.innerHTML = `${button.innerText} &#8226; Last Activity`
  });
});




