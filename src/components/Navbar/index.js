import React, { Component } from 'react';
import './Navbar.css';

class Navbar extends Component {
  render() {
    return (
        <div>
            <nav className="App-header">
                <a href="/">Sprinter</a>
            </nav>
        </div>
    );
  }
}

export default Navbar;