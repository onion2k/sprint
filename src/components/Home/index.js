import React, { Component } from "react";
import "./Home.css";
import { connect } from "react-redux";
import { Header, Statistic } from "semantic-ui-react";

function mapStateToProps(state) {
  return { project: state.projectReducer };
}

function mapDispatchToProps(dispatch) {
  return {};
}

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      project: props.project
    };
  }

  componentWillMount() {}

  render() {
    let features = this.state.project.features.length;
    let tasks =
      Object.keys(this.state.project.feature).reduce((a, b) => {
        return a + this.state.project.feature[b].tasks.length;
      }, 0) || 0;
    let hours =
      Object.keys(this.state.project.feature).reduce((a, b) => {
        let days = this.state.project.feature[b].tasks.reduce(function(a, b) {
          return a + (b.min + b.max) / 2;
        }, 0);
        return a + days;
      }, 0) || 0;

    let users = 3;

    return (
      <article className="Home">
        <Header as="h1" dividing>
          {this.state.project.title}
        </Header>

        <Statistic.Group widths="four">
          <Statistic>
            <Statistic.Value>{features}</Statistic.Value>
            <Statistic.Label>Features</Statistic.Label>
          </Statistic>

          <Statistic>
            <Statistic.Value>{tasks}</Statistic.Value>
            <Statistic.Label>Tasks</Statistic.Label>
          </Statistic>

          <Statistic>
            <Statistic.Value>{Math.round(hours / 7.5)}</Statistic.Value>
            <Statistic.Label>Days Quoted</Statistic.Label>
          </Statistic>

          <Statistic>
            <Statistic.Value>{users}</Statistic.Value>
            <Statistic.Label>Users</Statistic.Label>
          </Statistic>
        </Statistic.Group>
      </article>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
