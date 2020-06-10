import React from 'react';
import Pie from './Pie';
import $ from 'jquery';
import * as d3 from 'd3';
import { mount } from 'enzyme';
describe('Pie', () => {
	const defaultProps = {
		data: [
			{ label: 'TotalConfirmed', value: 20917 },
			{ label: 'TotalDeaths', value: 369 },
			{ label: 'TotalRecovered', value: 2171 },
		],
		height: 200,
		width: 200,
		r: 30,
		ir: 10,
	};

	// const wrapper = mount(<Pie {...defaultProps} />);

	it('should render Pie', () => {
		const arcSpy = jest.spyOn(d3, 'arc');
		const selectSpy = jest.spyOn(d3, 'select');
		const scaleOrdinalSpy = jest.spyOn(d3, 'scaleOrdinal');
		const pieSpy = jest.spyOn(d3, 'pie');

		const wrapper = mount(<Pie {...defaultProps} />);
		expect(wrapper.find('.Pie')).toHaveLength(1);

		expect(arcSpy).toHaveBeenCalled();
		expect(pieSpy).toHaveBeenCalled();
		expect(selectSpy).toHaveBeenCalled();
		expect(scaleOrdinalSpy).toHaveBeenCalled();
	});
});
