import React, { Component } from 'react';
import './Sprint.css';

class Sprint extends Component {
  render() {
    return (
        <section key={this.props.id}>
            <h1>Sprint { this.props.id }</h1>
        </section>
    );
  }
}

export default Sprint;
