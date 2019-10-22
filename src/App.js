import React from 'react';
import './App.css';
import MultiSelect from './multiSelect';
import options from './options';
function App() {
  return (
    <div className="container">
      <div className="multi-level">
        <p className="title">React Multi Level Selector</p>
        <MultiSelect
          options={options}
        />
      </div>
    </div>
  );
}

export default App;
