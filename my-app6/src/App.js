import React from 'react';

import Pie from './Pie/Pie';
import Table from './Table/Table';
import './App.css';


class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          "Country": "--",
          "TotalConfirmed": 0,
          "TotalDeaths": 0,
          "TotalRecovered": 0,
        }
      ],
     rowSelected: this.emptyChartData(),
     cols: [
          "Country",
          "TotalConfirmed",
          "TotalDeaths",
          "TotalRecovered",
     ],
     theme: ['#bde0fe', '#2698f9', '#71bcfd', '#f1f8fe']
    };
  }

  emptyChartData() {
    return [{label:"", value: 100}];
  }

  componentDidMount() {
    //get data
    this.getData()
      .then(response => response.json())
      .then(jsonData => {
        this.setState({
          data: jsonData.Countries,
        });
      })
      .catch(error => {
        this.setState({
          data: [],
          error: error,
        });
      });
  }

  getData = () => {
    return fetch('https://api.covid19api.com/summary');
  }

  pieDataRefactor(row) {
      return Object.entries(row)
      .filter(([key, value]) => Number.isInteger(value) && this.state.cols.includes(key)) 
      .map(([label, value]) => ({ label, value }));
  }

  rowSelected (row) {
      this.setState({
        rowSelected: this.pieDataRefactor(row),
        label: row.Country +"/Overview"
      });
  }

  clearSelection () {
      this.setState({
        rowSelected: this.emptyChartData(),
        label: ""
      });
  }

  render() {
    const data = this.state.data;
    const piedata = this.state.rowSelected;

    return (
      <div className="App">    
        <div className="row">
          <div className="col col-sm-12 col-md-6 table-panel"> 
            <h2>Text text header</h2>
            <p>text text text text text text text text text text text text text text text text text text text text text text text text </p>
            <Table 
              cols={this.state.cols}
              data={data} 
              rowSelected={this.rowSelected.bind(this)}
              theme={this.state.theme}
            />
          </div>
          <div className="col col-sm-12 col-md-6 chart-panel">
            <h3>{this.state.label}</h3>
            <Pie 
              data={piedata} 
              width="300"
              height="300"
              r="110"
              ir="0"
              theme={this.state.theme}
            />
            <button onClick={() => this.clearSelection()}>Clear Selected Country</button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
