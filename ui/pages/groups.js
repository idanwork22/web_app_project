
//Change groups
var groupButtonsSelectors = document.querySelectorAll(".groupButtonSelect");
console.log(groupButtonsSelectors)
var selectedGroupElement = document.querySelector(".groupName");

console.log(selectedGroupElement)
groupButtonsSelectors.forEach(function (button) {
  button.addEventListener("click", () => {
    selectedGroupElement.innerHTML = `${button.innerText} &#8226; Last Activity`
    isGroupAdmin(button.innerText,1234); //TODO: Add really user id from backend
  });
});



//insights
var insightDiv = document.querySelector('.insight');
var insights = () => {

  const data = [
    { name: 'Posts', score: 10 },
    { name: 'Likes', score: 1 },
    { name: 'Comments', score: 1 },
  ];
  var maxScore = 10
  const width = 450;
  const height = 450;
  const margin = { top: 50, bottom: 50, left: 50, right: 50 };

  const svg = d3.select('#d3-container')
    .append('svg')
    .attr('width', width - margin.left - margin.right)
    .attr('height', height - margin.top - margin.bottom)
    .attr("viewBox", [0, 0, width, height]);

  const x = d3.scaleBand()
    .domain(d3.range(data.length))
    .range([margin.left, width - margin.right])
    .padding(0.1)

  const y = d3.scaleLinear()
    .domain([0, maxScore])
    .range([height - margin.bottom, margin.top])

  svg
    .append("g")
    .attr("fill", '#0d6efd')
    .selectAll("rect")
    .data(data.sort((a, b) => d3.descending(a.score, b.score)))
    .join("rect")
    .attr("x", (d, i) => x(i))
    .attr("y", d => y(d.score))
    .attr('title', (d) => d.score)
    .attr("class", "rect")
    .attr("height", d => y(0) - y(d.score))
    .attr("width", x.bandwidth());

  function yAxis(g) {
    g.attr("transform", `translate(${margin.left}, 0)`)
      .call(d3.axisLeft(y).ticks(null, data.format))
      .attr("font-size", '1rem')
  }

  function xAxis(g) {
    g.attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x).tickFormat(i => data[i].name))
      .attr("font-size", '1rem')
  }

  svg.append("g").call(xAxis);
  svg.append("g").call(yAxis);
  svg.node();
}

insights();
// var isGroupAdmin=(groupname,userId)=>{//TODO: Add really user id from backend
//   if(groupname ==='Group 1'){
//     insights();
//   }else{
//     insightDiv.classList.add('disabled')
//   }
// }
