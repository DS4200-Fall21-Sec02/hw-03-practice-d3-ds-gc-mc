// write your javascript code here.
// feel free to change the preset attributes as you see fit

let margin = {
    top: 60,
    left: 50,
    right: 30,
    bottom: 35
  },
  width = 500 - margin.left - margin.right,
  height = 500 - margin.top - margin.bottom;

// first visualization
let svg1 = d3.select('#vis1')
  .append('svg')
  .attr('preserveAspectRatio', 'xMidYMid meet') // this will scale your visualization according to the size of its parent element and the page.
  .attr('width', '100%') // this is now required by Chrome to ensure the SVG shows up at all
  .style('background-color', '#ccc') // change the background color to light gray
  .attr('viewBox', [0, 0, width + margin.left + margin.right, height + margin.top + margin.bottom].join(' '))

  d3.csv("data/Priors_Clean.csv").then (function (data) {
    const subgroups = data.columns.slice(1)

    const years = data.map(d=> d.year)

    console.log(years)

    const x = d3.scaleBand().domain(years).range([0, width]).padding([.2])
    svg1.append("g").attr("transform", `translate(0, ${height})`)
    .call(d3.axisBottom(x).tickSize(0));


    const y = d3.scaleLinear()
    .domain([0, 40])
    .range([ height, 0 ]);
  svg1.append("g")
    .call(d3.axisLeft(y));


    const xSubgroup = d3.scaleBand()
    .domain(subgroups)
    .range([0, x.bandwidth()])
    .padding([0.05])


    const color = d3.scaleOrdinal()
    .domain(subgroups)
    .range(['#e41a1c','#377eb8','#4daf4a'])


  svg1.append("g")
    .selectAll("g")
    // Enter in data = loop group per group
    .data(data)
    .join("g")
      .attr("transform", d => `translate(${x(d.group)}, 0)`)
    .selectAll("rect")
    .data(function(d) { return subgroups.map(function(key) { return {key: key, value: d[key]}; }); })
    .join("rect")
      .attr("x", d => xSubgroup(d.key))
      .attr("y", d => y(d.value))
      .attr("width", xSubgroup.bandwidth())
      .attr("height", d => height - y(d.value))
      .attr("fill", d => color(d.key));

})

  

// second visualization
let svg2 = d3.select('#vis2')
  .append('svg')
  .attr('preserveAspectRatio', 'xMidYMid meet') // this will scale your visualization according to the size of its parent element and the page.
  .attr('width', '100%') // this is now required by Chrome to ensure the SVG shows up at all
  .style('background-color', '#ccc') // change the background color to light gray
  .attr('viewBox', [0, 0, width + margin.left + margin.right, height + margin.top + margin.bottom].join(' '))


d3.csv("data/Priors_Clean.csv").then (function (data) {
    const subgroups = data.columns.slice(1)

    const years = data.map(d=> d.year)

    console.log(years)

    const x = d3.scaleBand().domain(years).range([0, width]).padding([.2])
    svg.append("g").attr("transform", `translate(0, ${height})`)
    .call(d3.axisBottom(x).tickSize(0));


    const y = d3.scaleLinear()
    .domain([0, 40])
    .range([ height, 0 ]);
  svg.append("g")
    .call(d3.axisLeft(y));


    const xSubgroup = d3.scaleBand()
    .domain(subgroups)
    .range([0, x.bandwidth()])
    .padding([0.05])


    const color = d3.scaleOrdinal()
    .domain(subgroups)
    .range(['#e41a1c','#377eb8','#4daf4a'])


  svg.append("g")
    .selectAll("g")
    // Enter in data = loop group per group
    .data(data)
    .join("g")
      .attr("transform", d => `translate(${x(d.group)}, 0)`)
    .selectAll("circle")
    .data(function(d) { return subgroups.map(function(key) { return {key: key, value: d[key]}; }); })
    .join("circle")
      .attr("x", d => xSubgroup(d.key))
      .attr("y", d => y(d.value))
      .attr("width", xSubgroup.bandwidth())
      .attr("height", d => height - y(d.value))
      .attr("fill", d => color(d.key));

})
