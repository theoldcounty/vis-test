import React from 'react';
import Table from './Table';
import allData from '../data.json';
import { shallow } from 'enzyme';

const columns = [
	'Country',
	'CountryCode',
	'Slug',
	'NewConfirmed',
	'TotalConfirmed',
	'NewDeaths',
	'TotalDeaths',
	'NewRecovered',
	'TotalRecovered',
	'Date',
];
describe('Table', () => {
	const defaultProps = {
		cols: columns,
		data: allData.Countries,
		rowSelected: jest.fn(),
	};

	const wrapper = shallow(<Table {...defaultProps} />);

	it('should render table', () => {
		expect(wrapper.find('.Table th')).toHaveLength(10);
		expect(wrapper.find('.Table tbody tr')).toHaveLength(allData.Countries.length);
	});

	it('should call rowSelected', () => {
		const row = wrapper.find('.Table tbody tr').at(0);

		row.simulate('click');

		expect(defaultProps.rowSelected).toHaveBeenCalled();
		expect(defaultProps.rowSelected).toHaveBeenCalledWith(allData.Countries[0]);
	});
});
