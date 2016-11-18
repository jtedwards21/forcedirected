var url = "https://raw.githubusercontent.com/DealPete/forceDirected/master/countries.json"

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
var force = d3.layout.force()
.size([width, height])
.nodes(nodes)
.links(links)

force.linkDistance(width/3)

var svg = d3.select('#chart')

var link = svg.selectAll('.link')
.data(links)
.enter().append('line')
.attr('class', 'link')

var node = svg.selectAll('.node')
.data(nodes)
.enter().append('circle')
.attr('class', 'node')

}



//Call for JSON data
d3.json(url, function(data){

var nodes = data.nodes
var links = data.links

})
