/*global d3*/

var Birdnest = (function() {
	var STEPWIDTH = 200.0;
	var LINE_LENGTH = 40;
	var SCALING_MIN = 10*STEPWIDTH;
	var SCREEN_WIDTH = 500;
	var SCREEN_HEIGHT = 500;
	var LINE_MAX = 5000;

	var seed = {
	    i: 0, 
	    x1: calcStart({x: SCREEN_WIDTH/2, y: SCREEN_HEIGHT/2}, 0).x , 
	    y1: calcStart({x: SCREEN_WIDTH/2, y: SCREEN_HEIGHT/2}, 0).y , 
	    x2: calcEnd({x: SCREEN_WIDTH/2, y: SCREEN_HEIGHT/2}, 0).x , 
	    y2: calcEnd({x: SCREEN_WIDTH/2, y: SCREEN_HEIGHT/2}, 0).y
	};

	function newLine(lastLine, total) {
	    var scale = (total > SCALING_MIN) ? total : SCALING_MIN;
	    var middlePos = calcMiddle(lastLine,scale);
	    var rotation = Math.random()*Math.PI;
	    //var rotation = (lastLine.i%27) * Math.PI/27;
	    var startPos = calcStart(middlePos, rotation);
	    var endPos = calcEnd(middlePos, rotation);
	    var line = {i: lastLine.i + 1, x1: startPos.x, y1: startPos.y,
	                 x2: endPos.x, y2: endPos.y};
	    return line;
	}

	function calcMiddle(lastLine, scale) {
	    var i = lastLine.i + 1;
	    var x = SCREEN_WIDTH/2 + Math.min(SCREEN_WIDTH, SCREEN_HEIGHT)/3*i*Math.cos(2*Math.PI*i/STEPWIDTH)/scale;
		var y = SCREEN_HEIGHT/2 + Math.min(SCREEN_WIDTH, SCREEN_HEIGHT)/3*i*Math.sin(2*Math.PI*i/STEPWIDTH)/scale;
	    
	    return {x: x, y: y};
	}
	    
	function calcStart(middlePos, angle){
	    var x = middlePos.x + (LINE_LENGTH/2) * Math.cos(angle);
		var y = middlePos.y + (LINE_LENGTH/2) * Math.sin(angle);
		return {x: x, y: y};
	}
	    
	function calcEnd(middlePos, angle){
	    var x = middlePos.x + (LINE_LENGTH/2) * Math.cos(angle+Math.PI);
		var y = middlePos.y + (LINE_LENGTH/2) * Math.sin(angle+Math.PI);
		return {x: x, y: y};
	}

	// D3 functions
	function x1(d) {return d.x1;}
	function y1(d) {return d.y1;}
	function x2(d) {return d.x2;}
	function y2(d) {return d.y2;}

	function highlight(d) {
		var colour = d3.event.type === 'mouseover' ? 'green' : '#777';
		d3.select('#id-'+parseInt(d.i)).style('stroke', colour);
	}

	function createLines(counter) {
		var lines = [];
		var line = seed;
	    for(var i=0; i<counter; i++){
	    lines.push(line);
	    line = newLine(line,counter);
	    }
	    return lines;
	}

	function createSVG(lines) {
		var svg = document.createElementNS(d3.ns.prefix.svg, 'svg');
		d3.select(svg)
			.selectAll('line')
			.data(lines)
			.enter()
			.append('line')
			.attr('x1', x1)
			.attr('y1', y1)
			.attr('x2', x2)
			.attr('y2', y2)
			.style('stroke-width', 2)
			.attr('id', function(d) {
				return 'id-'+d.i;
			});
		return svg;
	}

	return {
		create : function(linecounter, svgCounter) {
			var container = $('<div></div>');
			for(var svgIndex=0; svgIndex<svgCounter; svgIndex++){
				var lines = createLines(Math.min(linecounter, LINE_MAX));
				var svg = createSVG(lines);
				container.append(svg);
			}
			return container;
		}
	}
})();
