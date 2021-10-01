// write your javascript code here.
// feel free to change the preset attributes as you see fit

// set margins
let margin = {
      top: 30,
      left: 20,
      right: 20,
      bottom: 30
    },
    width = 500 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

// first visualization
let svg1 = d3.select('#vis1')
.append('svg')
.attr('preserveAspectRatio', 'xMidYMid meet') // this will scale your visualization according to the size of its parent element and the page.
.attr('width', '100%') // this is now required by Chrome to ensure the SVG shows up at all
.style('background-color', '#ccc') // change the background color to light gray
.attr('viewBox', [0, 0, width + margin.left + margin.right, height + margin.top].join(' '))

// read data
  d3.csv("data/Priors_Clean.csv").then (function (data) {
    // get number of conviction categories
    const number = data.columns.slice(1);
    // get years
    const years = data.map(d => d.year);

    // x axis
    const x = d3.scaleBand().domain(years).range([0, width + 30]).padding([1.2]);

    // y axis
    const y = d3.scaleLinear()
    .domain([0, 60])
    .range([ height, 0 ]);
    svg1.append("g")
    .attr("transform", "translate(" + margin.left + ",0)")
    .call(d3.axisLeft(y));

  // Color scale: assign color to each category
  const color = d3.scaleOrdinal()
  .domain(number)
  .range(['#e41a1c','#377eb8','#4daf4a','#b319e7'])

    // to limit x axis
    let x0 = d3.scaleBand()
    .domain(data.map(d => d[data.columns[0]]))
    .rangeRound([0, width])
    .paddingInner(0.1)

    // to limit x axis
    let x1 = d3.scaleBand()
    .domain(number)
    .rangeRound([0, x0.bandwidth()])
    .padding(0.05)

    svg1.append("g")
    .selectAll("g")
    .data(data)
    .join("g")
    .attr("transform", d => `translate(${x0(d[data.columns[0]])},0)`)
    .selectAll("rect")
    .data(d => number.map(key => ({key, value: d[key]})))
    .join("rect")
    .attr("x", d => x1(d.key) + 15)
    .attr("y", d => y(d.value))
    .attr("width", x1.bandwidth())
    .attr("height", d => y(0) - y(d.value))
    .attr("fill", d => color(d.key));

    // creates legend
    const legend = svg => {
      const g = svg
      .attr("transform", `translate(${width},0)`)
      .attr("text-anchor", "end")
      .attr("font-family", "sans-serif")
      .attr("font-size", 10)
      .selectAll("g")
      .data(color.domain().slice().reverse())
      .join("g")
      .attr("transform", (d, i) => `translate(0,${i * 20})`);

      g.append("rect")
      .attr("x", -19)
      .attr("width", 19)
      .attr("height", 19)
      .attr("fill", color);

      g.append("text")
      .attr("x", -24)
      .attr("y", 9.5)
      .attr("dy", "0.35em")
      .text(d => d);
    }

    svg1.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(d3.axisBottom(x).tickSize(0));

    svg1.append("g")
    .call(legend);
})



// second visualization

let svg2 = d3.select('#vis2')
.append('svg')
.attr('preserveAspectRatio', 'xMidYMid meet') // this will scale your visualization according to the size of its parent element and the page.
.attr('width', '100%') // this is now required by Chrome to ensure the SVG shows up at all
.style('background-color', '#ccc') // change the background color to light gray
.attr('viewBox', [0, 0, width + margin.left + margin.right, height + margin.top].join(' '))


d3.csv("data/HeightWeight_Clean.csv").then (function (data) {

  const number = data.columns.slice(1);

  // x axis
  const x = d3.scaleLinear().domain([60, 75]).range([0, width]);

  // y axis
  const y = d3.scaleLinear().domain([90, 165]).range([ height, 0 ]);

  // to limit x axis
  let x0 = d3.scaleBand()
  .domain(data.map(d => d[data.columns[0]]))
  .rangeRound([0, width])
  .paddingInner(0.1)

  // to limit x axis
  let x1 = d3.scaleBand()
  .domain(number)
  .rangeRound([0, x0.bandwidth()])
  .padding(0.05)

  svg2.append("g")
  .selectAll("g")
  .data(data)
  .join("g")
  .attr("transform", d => `translate(${x(d[data.columns[0]])},${y(d[data.columns[1]])})`)
  .selectAll("circle")
  .data(d => number.map(key => ({key, value: d[key]})))
  .join("circle")
  .attr("x", d => d => number.map(key => ({key, value: d[key]})))
  .attr("y", d => y(d.value))
  .attr("r", 3)
  .attr("fill", '#e41a1c');

  svg2.append("g")
  .attr("transform", `translate(0, ${height})`)
  .call(d3.axisBottom(x).tickSize(0));

  svg2.append("g")
  .attr("transform", "translate(" + margin.left * 2 + ",0)")
  .call(d3.axisLeft(y));
})