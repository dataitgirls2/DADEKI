// 원본 코드 출처: https://www.kaggle.com/triskelion/normalized-kaggle-distance
// 적절히 수정해서 써먹은 사람:  Eunorek
// 원본 코드와 마찬가지로 Apache 2.0 라이센스를 따릅니다

function get_network_chart(target) {
		var diameter = 700,
			radius = diameter / 2,
			innerRadius = radius - 120;

		var cluster = d3.layout.cluster()
			.size([360, innerRadius])
			.sort(null)
			.value(function(d) { return d.size; });

		var bundle = d3.layout.bundle();

		var line = d3.svg.line.radial()
			.interpolate("bundle")
			.tension(.7) 																			// tention입니다
			.radius(function(d) { return d.y; })
			.angle(function(d) { return d.x / 180 * Math.PI; });

		var svg = d3.select(target).append("svg")
			.attr("width", diameter+20)
			.attr("height", diameter+20)
		  .append("g")
			.attr("transform", "translate(" + radius + "," + radius + ")");

		var link = svg.append("g").selectAll(".link"),
			node = svg.append("g").selectAll(".node");

			// 내가 import 하는 것: 빨강, 나를 import 하는 것: 초록
		var classes = [
			{"imports": ['애란', 'Joeun Park', 'Jinyoung Kim', 'Louise Lee', '안세영'] , "name":"soryungKim"},
			{"imports": ['애란', 'Joeun Park', 'soryungKim', 'Ryan Kim', 'Chaewon'] , "name":"정예원"},
			{"imports": ['애란', 'Joeun Park', 'Louise Lee', 'Ryan Kim', 'soryungKim'] , "name":"YeEun Kim"},
			{"imports": ['애란', 'Bluence', '박소현', '정다현', 'Joeun Park'] , "name":"Yaein Jung"},
			{"imports": ['애란', 'Joeun Park', 'soryungKim', 'Ryan Kim', '안세영'] , "name":"Moonhee kim"},
			{"imports": ['Joeun Park', 'soryungKim', 'Louise Lee', 'Jy617 Lee', 'Jinyoung Kim'] , "name":"애란"},
			{"imports": ['Anne Shin', 'soryungKim', 'Moonhee kim', '박소현', 'Hong dayoung'] , "name":"JIHAE KIM"},
			{"imports": ['애란', 'Joeun Park', 'Louise Lee', '안세영', 'soryungKim'] , "name":"jihyun"},
			{"imports": ['애란', 'Joeun Park', 'Louise Lee', 'Chaewon', 'Ryan Kim'] , "name":"ChaeSongi"},
			{"imports": ['애란', 'Joeun Park', 'Louise Lee', 'Jinyoung Kim', 'soryungKim'] , "name":"Seonmin Park"},
			{"imports": ['애란', 'Joeun Park', 'soryungKim', 'Louise Lee', '안세영'] , "name":"Jinyoung Kim"},
			{"imports": ['애란', 'Joeun Park', '안세영', 'Louise Lee', 'Moonhee kim'] , "name":"Ryan Kim"},
			{"imports": ['애란', 'Louise Lee', 'Jinyoung Kim', 'soryungKim', 'Jy617 Lee'] , "name":"Joeun Park"},
			{"imports": ['애란', 'Sycha0816', 'Joeun Park', 'minkyung', 'soryungKim'] , "name":"Kavin Kwon"},
			{"imports": ['Ryan Kim', '애란', 'Jy617 Lee', 'Chaewon', 'soryungKim'] , "name":"이형섭"},
			{"imports": ['애란', 'Joeun Park', 'Louise Lee', '안세영', 'Jinyoung Kim'] , "name":"박진영"},
			{"imports": ['애란', 'Joeun Park', 'Louise Lee', 'Yoonkyung Kim', 'Sycha0816'] , "name":"mosadeel8811"},
			{"imports": ['애란', 'Joeun Park', 'Jiyoung Choi', 'jihyun', '안세영'] , "name":"정다현"},
			{"imports": ['애란', '안세영', 'Louise Lee', '정다현', 'Joeun Park'] , "name":"Hong dayoung"},
			{"imports": ['애란', 'Joeun Park', 'soryungKim', 'Louise Lee', 'Ryan Kim'] , "name":"안세영"},
			{"imports": ['애란', 'Joeun Park', 'soryungKim', 'Jy617 Lee', 'Chaewon'] , "name":"Saerombang11"},
			{"imports": ['애란', '안세영', 'Joeun Park', 'Louise Lee', 'Jinyoung Kim'] , "name":"박소현"},
			{"imports": ['애란', 'Joeun Park', 'soryungKim', 'Jy617 Lee', 'Jinyoung Kim'] , "name":"Jiyoung Choi"},
			{"imports": ['애란', 'Joeun Park', 'Louise Lee', 'Jinyoung Kim', 'Ryan Kim'] , "name":"Bluence"},
			{"imports": ['애란', 'Jiyoung Choi', 'Louise Lee', 'Jy617 Lee', 'Joeun Park'] , "name":"Jihyun Han"},
			{"imports": ['애란', 'Joeun Park', 'Louise Lee', 'Anne Shin', 'Jinyoung Kim'] , "name":"seoyeongsong"},
			{"imports": ['안세영', 'Louise Lee', 'Jinyoung Kim', '애란', 'Joeun Park'] , "name":"Yooshin"},
			{"imports": ['애란', 'soryungKim', 'Chaewon', 'Jihye Jung', 'Jiyoung Choi'] , "name":"minkyung"},
			{"imports": ['Joeun Park', '애란', 'Anne Shin', 'Louise Lee', 'Jieun Kim'] , "name":"Yoonkyung Kim"},
			{"imports": ['애란', 'Joeun Park', 'Anne Shin', 'soryungKim', 'Jinyoung Kim'] , "name":"Louise Lee"},
			{"imports": ['애란', 'Joeun Park', 'Jiyoung Choi', 'Ryan Kim', 'Yoonkyung Kim'] , "name":"Jy617 Lee"},
			{"imports": ['애란', 'Joeun Park', 'Jinyoung Kim', 'Jiyoung Choi', 'Louise Lee'] , "name":"ahlum cho"},
			{"imports": ['mosadeel8811', 'Kavin Kwon', 'Yoonkyung Kim', 'Louise Lee', 'Jiyoung Choi'] , "name":"Sycha0816"},
			{"imports": ['애란', 'Joeun Park', 'Yoonkyung Kim', 'soryungKim', 'Louise Lee'] , "name":"Jieun Kim"},
			{"imports": ['애란', 'Joeun Park', 'Jinyoung Kim', 'Yoonkyung Kim', 'Jiyoung Choi'] , "name":"Yebin Jang"},
			{"imports": ['애란', 'Joeun Park', 'Jinyoung Kim', 'Chaewon', 'Moonhee kim'] , "name":"Jiseon Choe"},
			{"imports": ['Joeun Park', '애란', 'soryungKim', 'minkyung', 'Jy617 Lee'] , "name":"Jihye Jung"},
			{"imports": ['애란', 'Louise Lee', 'Joeun Park', 'Ryan Kim', 'Moonhee kim'] , "name":"HeeYoung Kim"},
			{"imports": ['애란', 'Joeun Park', '안세영', 'Jy617 Lee', 'seoyeongsong'] , "name":"dahyelee"},
			{"imports": ['애란', 'Joeun Park', 'Louise Lee', 'Anne Shin', 'Jiyoung Choi'] , "name":"서은정"},
			{"imports": ['애란', 'Joeun Park', 'Louise Lee', 'Moonhee kim', 'minkyung'] , "name":"Chaewon"},
			{"imports": ['애란', 'Louise Lee', 'Joeun Park', 'soryungKim', 'Jinyoung Kim'] , "name":"Anne Shin"}
		]
		  var nodes = cluster.nodes(packageHierarchy(classes)),
			  links = packageImports(nodes);

		  link = link
			  .data(bundle(links))
			.enter().append("path")
			  .each(function(d) { d.source = d[0], d.target = d[d.length - 1]; })
			  .attr("class", "link")
			  .attr("d", line);

		  node = node
			  .data(nodes.filter(function(n) { return !n.children; }))
			.enter().append("text")
			  .attr("class", "node")
			  .attr("dy", ".31em")
			  .attr("transform", function(d) { return "rotate(" + (d.x - 90) + ")translate(" + (d.y + 8) + ",0)" + (d.x < 180 ? "" : "rotate(180)"); })
			  .style("text-anchor", function(d) { return d.x < 180 ? "start" : "end"; })
			  .text(function(d) { return d.key; })
			  .on("mouseover", mouseovered)
			  .on("mouseout", mouseouted);

		function mouseovered(d) {
		  node
			  .each(function(n) { n.target = n.source = false; });

		  link
			  .classed("link--target", function(l) { if (l.target === d) return l.source.source = true; })
			  .classed("link--source", function(l) { if (l.source === d) return l.target.target = true; })
			.filter(function(l) { return l.target === d || l.source === d; })
			  .each(function() { this.parentNode.appendChild(this); });

		  node
			  .classed("node--target", function(n) { return n.target; })
			  .classed("node--source", function(n) { return n.source; });
		}

		function mouseouted(d) {
		  link
			  .classed("link--target", false)
			  .classed("link--source", false);

		  node
			  .classed("node--target", false)
			  .classed("node--source", false);
		}

		d3.select(self.frameElement).style("height", diameter + "px");

		// Lazily construct the package hierarchy from class names.
		function packageHierarchy(classes) {
		  var map = {};

		  function find(name, data) {
			var node = map[name], i;
			if (!node) {
			  node = map[name] = data || {name: name, children: []};
			  if (name.length) {
				node.parent = find(name.substring(0, i = name.lastIndexOf(".")));
				node.parent.children.push(node);
				node.key = name.substring(i + 1);
			  }
			}
			return node;
		  }

		  classes.forEach(function(d) {
			find(d.name, d);
		  });

		  return map[""];
		}

		// Return a list of imports for the given array of nodes.
		function packageImports(nodes) {
		  var map = {},
			  imports = [];

		  // Compute a map from name to node.
		  nodes.forEach(function(d) {
			map[d.name] = d;
		  });

		  // For each import, construct a link from the source to target node.
		  nodes.forEach(function(d) {
			if (d.imports) d.imports.forEach(function(i) {
			  imports.push({source: map[d.name], target: map[i]});
			});
		  });

		  return imports;
		}
};
