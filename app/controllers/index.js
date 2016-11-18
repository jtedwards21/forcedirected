var url = "https://raw.githubusercontent.com/DealPete/forceDirected/master/countries.json"
var radius = 5

var margins = {
"top": 5,
"left": 5,
"bottom": 5,
"right":5
}

var height = 500 - margins.top - margins.bottom
var width = 500 - margins.left - margins.right

//Set box and svg dimensions

d3.select(".box")
.attr("height", height + margins.top + margins.bottom)
.attr("width", width + margins.left + margins.right)

d3.select("#chart")
.attr("height", height + margins.top + margins.bottom)
.attr("width", width + margins.left + margins.right)

var draw = function(nodes, links){

//Start Simulation
var simulation = d3.forceSimulation(nodes)
simulation.force("link", d3.forceLink(links))


//Map Links and Nodes to SVG

var svg = d3.select('#chart')

var link = svg.selectAll('.link')
.data(links)
.enter().append('line')
.attr('class', 'link')

var node = svg.selectAll('.node')
.data(nodes)
.enter().append('circle')
.attr('class', 'node')

//Paint on a turn of the simulation

simulation.on('end', function() {

node.attr('r', radius)
.attr('cx', function(d) {return d.x})
.attr('cy', function(d) {return d.y})

//Source property?
link.attr('x1', function(d) { return d.source.x; })
.attr('y1', function(d) { return d.source.y; })
.attr('x2', function(d) { return d.target.x; })
.attr('y2', function(d) { return d.target.y; });

})
 
return simulation

}



//Call for JSON data
d3.json(url, function(data){

var nodes = data.nodes
console.log(nodes[4])
var links = data.links
console.log(links[3])
draw(nodes, links)
})
