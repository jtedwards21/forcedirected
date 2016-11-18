var url = "https://raw.githubusercontent.com/DealPete/forceDirected/master/countries.json"
var radius = 5

var margins = {
"top": 5,
"left": 5,
"bottom": 5,
"right":5
}

var height = 700 - margins.top - margins.bottom
var width = 700 - margins.left - margins.right

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
simulation.force("center", d3.forceCenter(height/2, width/2))
simulation.force("manybody", d3.forceManyBody().strength(-10))


//Map Links and Nodes to SVG

var svg = d3.select('#chart')

var link = svg.selectAll('.link')
.data(links)
.enter().append('line')
.attr('class', 'link')

//I can't see it because it's in html, this is svg

var flagbox = d3.select("#flagbox")

var node = flagbox.selectAll('.node')
.data(nodes)
.enter().append('img')
.attr('class', d => 'flag flag-' + d.code)

//Paint on a turn of the simulation

simulation.on('end', function() {

node
.style('left', d => d.x + "px")
.style('top', d => d.y + "px")

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
var links = data.links
draw(nodes, links)
})
