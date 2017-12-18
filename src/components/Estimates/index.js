import React, { Component } from "react";
import { Header } from "semantic-ui-react";
import "./Estimates.css";

class Estimates extends Component {
  render() {
    return (
      <article className="Estimates">
        <Header as="h1" dividing>
          Estimates
        </Header>
      </article>
    );
  }
}

export default Estimates;
