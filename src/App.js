import React from 'react';
import ReactJson from 'react-json-view'
import './App.css';
import MultiSelect from './multiSelect';
import options from './options';
class App extends React.Component {
  constructor() {
    super()
    this.state = {
      values: [],
    }
  }

  onChange = (values) => {
    this.setState({ values });
  }
  render() {
    return (
      <div className="container">
        <div className="multi-level">
          <p className="title">React Multi Level Selector</p>
          <MultiSelect
            options={options}
            onChange={this.onChange}
          />
        </div>
        <p>Output</p>
        <div className="output">
          <ReactJson
            src={this.state.values}
            enableClipboard={false}
            displayDataTypes={false}
            displayObjectSize={false}
          />
        </div>
      </div>
    );
  }
}
export default App;
