console.log("d3");

var data = [
	{
		"value": 45,
		"label": "1"
	},
	{
		"value": 78,
		"label": "2"
	},
	{
		"value": 32,
		"label": "3"
	},
	{
		"value": 89,
		"label": "4"
	},
	{
		"value": 20,
		"label": "5"
	},
	{
		"value": 120,
		"label": "6"
	}
];


var height = "600",
	width = "1280";

var canvas =  d3.select("body")
	.append('svg')
	.attr('width', width)
	.attr('height', height);

var color = d3.scale.linear()
	.domain([0,150])
	.range(["orange" , "purple"]);

var colorTween = d3.scale.linear()
	.domain([0,150])
	.range(["purple" , "orange"]);

var circles = canvas.selectAll("circle")
	.data(data)
	.enter()
	.append("circle")
	.attr("cx", function(d, i) {
		console.log(i);
		return 130 + i * 200;
	})
	.attr("cy", function() {
		//return height/2;
		return - 200;
	})
	.attr("fill" , function(d) {
		return color(d.value);
	})
	.attr("r", function(d, i) {
		return d.value - 20 / (i+1);
	})
		.on("mouseover", function() {
			console.log("over");
			d3.select(this)
				.transition()
				.attr("r", function(d, i) {
					return d.value + 20;
				})
				.attr("fill" , function(d) {
					return color(d.value);
				});
		})
		.on("mouseout", function(d) {
			console.log("out");
			d3.select(this)
				.transition()
				.duration(250)
				.attr("r", function(d, i) {
					return d.value;
				})
				.attr("fill" , function(d) {
					return colorTween(d.value);
				});
		})
		.on("click", function() {
			sortCircles();
		})
		.transition()
		.delay(function(d, i) { return i * 50 + 1500; })
		.duration(1500)
		.attr("cy" , function() {
			return height/2;
		})
		.transition()
		.attr("fill", function(d) {
			return colorTween(d.value);
		})
		.attr("r", function(d) {
			return d.value;
		});


var texts = canvas.selectAll("text")
		.data(data)
		.enter()
		.append("text")
		.attr("fill" , function(d) {
			return color(d.value);
		})
		//.style("opacity" , 0)
		.attr("x", function(d, i) {
			console.log(i);
			return 130 + i * 200 - 4;
		})
		.attr("y", function() {
			//return height/2;
			return - 200;
		})
		.text(function(d) {
			return d.label;
		})
		.transition()
		.delay(function(d, i) { return i * 50 + 1500; })
		.duration(1500)
		.attr("y", function() {
			return height/2 + 6;
			//return - 200;
		})
		//.style("opacity", 1)
		.transition()
		.attr("fill" , "white");



//Define sort function
var sortCircles = function() {
	console.log("shuffle");
	d3.shuffle(data);

		canvas.selectAll("circle")
		.data(data)
		.transition()
		.duration(1000)
		.attr("r", function(d, i) {
			console.log(i);
			return d.value;
		})
		.attr("fill" , function(d) {
			return color(d.value);
		});

	canvas.selectAll("text")
		.data(data)
		//.style("fill-opacity" , "0")
		.attr("x", function(d, i) {
			console.log(i);
			return 130 + i * 200 - 4;
		})
		.attr("y", function() {
			return height/2 + 6;
			//return - 200;
		})
		.text(function(d) {
			return d.label;
		})
};