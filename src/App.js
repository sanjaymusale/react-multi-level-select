import React from 'react';
import ReactJson from 'react-json-view'
import { animateScroll } from "react-scroll";
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

  scrollToBottom = () => {
    animateScroll.scrollToBottom({
      containerId: "OutputCont"
    });
  };

  onChange = (values) => {
    this.setState({ values }, this.scrollToBottom);
  }
  render() {
    return (
      <div className="container">
        <div className="multi-level">
          <p className="title">React Multi Level Selector</p>
          <MultiSelect
            options={options}
            onChange={this.onChange}
            className="test"
          />
        </div>
        <p>Output</p>
        <div className="output" id="OutputCont">
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
