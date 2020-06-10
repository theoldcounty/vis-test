import React from 'react';
import * as d3 from 'd3';
import $ from 'jquery';
import './Pie.css';

class Pie extends React.Component {
	constructor(props) {
		super(props);
		this.myRef = React.createRef();
		this.state = {
			data: [],
			theme: this.props.theme ? this.props.theme : ['#bde0fe', '#2698f9', '#71bcfd', '#f1f8fe']
		};
	}

	render() {
		var $this = $(this.myRef.current);

		//clean
		d3.select($this[0])
			.selectAll('svg')
			.remove();
		const data = this.props.data;

		const width = parseInt(this.props.width, 10),
			height = parseInt(this.props.height, 10),
			radius = parseInt(this.props.r, 10),
			innerradius = parseInt(this.props.ir, 10);

		var color = d3.scaleOrdinal().range(this.state.theme);

		var arc = d3
			.arc()
			.outerRadius(radius - 10)
			.innerRadius(innerradius);

		data.forEach(function(d) {
			d.total = +d.value;
		});

		var pie = d3
			.pie()
			.sort(null)
			.value(function(d) {
				return d.total;
			});

		var svg = d3
			.select($this[0])
			.append('svg')
			.attr('width', width)
			.attr('height', height)
			.append('g')
			.attr('class', 'piechart')
			.attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');

		var segments = svg.append('g').attr('class', 'segments');

		var slices = segments
			.selectAll('.arc')
			.data(pie(data))
			.enter()
			.append('g')
			.attr('class', 'arc');

		slices
			.append('path')
			.attr('d', arc)
			.attr('fill', function(d, i) {
				return color(i);
			})
			.transition()
			.attrTween('d', function(d) {
				var i = d3.interpolate(d.startAngle+0.1, d.endAngle);
				return function(t) {
					d.endAngle = i(t);
					return arc(d);
				}
			});

		return <div ref={this.myRef} className="Pie" />;
	}
}
export default Pie;
