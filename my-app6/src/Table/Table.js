import React from 'react';
import $ from 'jquery';
import './Table.css';

class Table extends React.Component {
	constructor(props) {
		super(props);
		this.myRef = React.createRef();

		this.state = {
			cols: props.cols,
			theme: this.props.theme ? this.props.theme : ['#bde0fe', '#2698f9', '#71bcfd', '#f1f8fe']
		};
	}

	componentDidUpdate() {
		this.handleLoad();
	}

	componentDidMount() {
		this.handleLoad();
	}

	handleLoad() {
		let $this = $(this.myRef.current);

		let theme = this.state.theme;

		$this.find("th").css({"background-color" :theme[3], "color": theme[2]});

		//hover
		$this.find("tr").mouseover(function() {
		    $(this).css({"background-color" :theme[3], "color": theme[2]});
		}).mouseout(function() {
		    $(this).css({"background-color" :"transparent", "color": '#868589'});
		});
	}

	handleClick(row) {
		//send back to parent
		this.props.rowSelected(row);
	}

	rows(data) {
		return data.map((listValue, index) => {
			return (
				<tr key={index} onClick={() => this.handleClick(listValue)}>
					{this.state.cols.map((key, index) => {
						return <td key={key}>{listValue[key]}</td>;
					})}
				</tr>
			);
		});
	}

	render() {
		return (
			<div ref={this.myRef} className="Table">
				<table>
					<thead>
						<tr>
							{this.state.cols.map((key, index) => {
								return <th key={index}>{key}</th>;
							})}
						</tr>
					</thead>
					<tbody>{this.rows(this.props.data)}</tbody>
				</table>
			</div>
		);
	}
}
export default Table;
