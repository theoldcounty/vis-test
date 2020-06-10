import React from 'react';
import { shallow } from 'enzyme';
import App from './App';
import Table from './Table/Table';
import Pie from './Pie/Pie';
import allData from './data.json';

fetch = jest.fn().mockImplementation(() => {
	const data = allData;

	data.json = jest.fn().mockImplementation(() => Promise.resolve(data));
	return Promise.resolve(data);
});
describe('App', () => {
	let wrapper = shallow(<App />);

	it('initial render', () => {
		expect(wrapper.find(Table).prop('cols')).toHaveLength(4);

		expect(wrapper.find(Pie).prop('data')).toEqual([
			{
				label: '',
				value: 100,
			},
		]);
	});

	it('should update pie data when row is selected', () => {
		const row = wrapper.state('data')[0];
		const pieDataRefactor = wrapper.instance().pieDataRefactor(row);
		wrapper.instance().rowSelected(row);

		expect(wrapper.find(Pie).prop('data')).toEqual(pieDataRefactor);
	});


	it('should catch error', async () => {
		fetch = jest.fn().mockImplementation(() => {
			return Promise.reject({ message: 'not able to fetch' });
		});

		wrapper = shallow(<App />);
		try {
			await wrapper.instance().getData();
		} catch (error) {
			expect(error).toEqual({ message: 'not able to fetch' });
		}
	});

	it('if clear button pressed', () => {
		const button = wrapper.find('button').at(0);

		button.simulate('click');

		expect(wrapper.find(Pie).prop('data')).toEqual([
			{
				label: '',
				value: 100,
			},
		]);
	});

});
