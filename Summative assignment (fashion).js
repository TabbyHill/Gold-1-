/** 
 * ======================================================================================================
 * Author:         Tabitha Hill
 * Date:           19/12/2021
 * Filename:       Summative assignment (fashion).js
 * Acknowledgment: This code uses the pie chart and bar chart
 *                 libraries from: https://www.d3-graph-gallery.com/
 * ======================================================================================================
*/

/** Pie chart */

/** create the size and margins of the pie chart */
var width1 = 470;
var height1 = 470;
var margin1 = 45;

/** radius is half of the smallest one out of the width the height, then subtract the margin */ 
var rad = Math.min(width1, height1) / 2 - margin1;

/** attach the svg object to the div called pie */
var svg1 = d3.select("#pie")
  .append("svg")
    .attr("width", width1)
    .attr("height", height1)
  .append("g")
    .attr("transform", "translate(" + width1 / 2 + "," + height1 / 2 + ")");

/** 3 data sets */
var data1 = {i: 14, j: 17, k:7, l:21, m:14};
var data2 = {i: 25, j: 13, k:19, l:11, m:27};
var data3 = {i: 8, j: 21, k:5, l:17, m:23};

/** set the colour scale */
var colour = d3.scaleOrdinal()
  .domain(["i", "j", "k", "l", "m"])
  .range(d3.schemeSet3);


/**
 * Updates the pie chart for incoming data.
 * @param {object} data - incoming data
 */
function update(data) {

  /** Calculate the position of each segment on the pie chart: */ 
  var pie_pos = d3.pie()
    .value(function(d) {return d.value; })
    .sort(function(i, j) { console.log(i) ; return d3.ascending(i.key, j.key);} ) ;// This make sure that group order remains the same in the pie chart
  var dataReady = pie_pos(d3.entries(data));

  /** map to data */
  var q = svg1.selectAll("path")
    .data(dataReady);

  /** each segment of the pie is x path that is built by using the arc function */
  q
    .enter()
    .append('path')
    .merge(q)
    .transition()
    .duration(1000)
    .attr('d', d3.arc()
      .innerRadius(0)
      .outerRadius(rad)
    )
    .attr('fill', function(d){ return(colour(d.data.key)) })
    .attr("stroke", "white")
    .style("stroke-width", "2px")
    .style("opacity", 1);

  /** remove the group that isn't present anymore */ 
  q
    .exit()
    .remove();

}

/** initialize the plot with the first dataset */
update(data1);

/**Bar chart */

/**  3 data sets */
var data4 = [
  {group: "UK", value: 15},
  {group: "Germany", value: 7},
  {group: "France", value: 1}
];

var data5 = [
  {group: "UK", value: 7},
  {group: "Germany", value: 19},
  {group: "France", value: 3}
];

var data6 = [
  {group: "UK", value: 2},
  {group: "Germany", value: 4},
  {group: "France", value: 16}
];

/** create the size and margins of the bar graph */
var margin2 = {top: 45, right: 45, bottom: 75, left: 65},
   width2 = 470 - margin2.left - margin2.right,
   height2 = 410 - margin2.top - margin2.bottom;

/** attach the svg object to the body of the page */
var svg2 = d3.select("#bar")
 .append("svg")
   .attr("width", width2 + margin2.left + margin2.right)
   .attr("height", height2 + margin2.top + margin2.bottom)
 .append("g")
   .attr("transform",
         "translate(" + margin2.left + "," + margin2.top + ")");

/** horizontal axis */
var z = d3.scaleBand()
 .range([ 0, width2 ])
 .domain(data4.map(function(d) { return d.group; }))
 .padding(0.2);
svg2.append("g")
 .attr("transform", "translate(0," + height2 + ")")
 .call(d3.axisBottom(z));

/** vertical axis */
var w = d3.scaleLinear()
 .domain([0, 20])
 .range([ height2, 0]);
svg2.append("g")
 .attr("class", "myYaxis")
 .call(d3.axisLeft(w));

/**
 * Updates the plot for each data set.
 * @param {any} data0 - incoming data
 */
function update1(data0) {

 var q = svg2.selectAll("rect")
   .data(data0);

 q
   .enter()
   .append("rect")
   .merge(q)
   .transition()
   .duration(1000)
     .attr("x", function(d) { return z(d.group); })
     .attr("y", function(d) { return w(d.value); })
     .attr("width", z.bandwidth())
     .attr("height", function(d) { return height2 - w(d.value); })
     .attr("fill", "#20B2AA");
}

/** initialize the plot with the first dataset */
update1(data4);


