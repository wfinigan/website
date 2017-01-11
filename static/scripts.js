<script src="//d3js.org/d3.v3.min.js" charset="utf-8"></script>
<script src="//d3js.org/topojson.v1.min.js"></script>
<script>

var width = 960,
    height = 600;

var path = d3.geo.path()
    .projection(null);

d3.selectAll(".map").append("svg")
    .attr("viewBox", "0 0 " + width + " " + height)
    .attr("width", width)
    .attr("height", height);

var svgMap = d3.select("#map").select("svg");

var radius = d3.scale.sqrt()
    .domain([0, 1000])
    .range([0, 15]);


d3.json("us.json", function(error, us) {
  if (error) return console.error(error);
    svgMap.append("path")
      .datum(topojson.feature(us, us.objects.nation))
      .attr("class", "land")
      .attr("d", path);

    svgMap.append("path")
      .datum(topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; }))
      .attr("class", "border border--state")
      .attr("d", path);

    svgMap.append("g")
      .attr("class", "bubble")
    .selectAll("circle")
      .data(topojson.feature(us, us.objects.counties).features
        .sort(function(a, b) { return b.properties.population - a.properties.population; }))
    .enter().append("circle")
      .attr("transform", function(d) { return "translate(" + path.centroid(d) + ")"; })
      .attr("r", function(d) { return radius(d.properties.capacity); });


    var legend = svgMap.append("g")
        .attr("class", "legend")
        .attr("transform", "translate(" + (width - 50) + "," + (height - 20) + ")")
      .selectAll("g")
        .data([1e3, 3e3, 6e3])
      .enter().append("g");

    legend.append("circle")
        .attr("cy", function(d) { return -radius(d); })
        .attr("r", radius);

    legend.append("text")
        .attr("y", function(d) { return -2 * radius(d); })
        .attr("dy", "1.3em")
        .text(d3.format(".1s"));

});

</script>
