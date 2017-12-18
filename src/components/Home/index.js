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
    let features = Object.keys(this.state.project.feature).length || 0;
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

    let days = Math.round(hours / 7.5);
    let sprints = Math.ceil(days / 10);

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
            <Statistic.Value>{days}</Statistic.Value>
            <Statistic.Label>Days Quoted</Statistic.Label>
          </Statistic>

          <Statistic>
            <Statistic.Value>{sprints}</Statistic.Value>
            <Statistic.Label>Sprints</Statistic.Label>
          </Statistic>
        </Statistic.Group>

        <Header as="h2" dividing>
          Project Timeline
        </Header>
      </article>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
