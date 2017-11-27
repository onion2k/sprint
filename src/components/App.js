import React, { Component } from 'react';
import './App.css';

import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Editor from './Editor';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <main>
            <Sidebar />
            <Editor />
        </main>
      </div>
    );
  }
}

export default App;
