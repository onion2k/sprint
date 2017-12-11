import React, { Component } from 'react';
import './Home.css';
import { connect } from 'react-redux';
import * as actions from '../../data/actions';
import { bindActionCreators } from 'redux';
import { Header, Statistic } from 'semantic-ui-react';

function mapStateToProps(state) {
  return { project: state.projectReducer };
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actions, dispatch) };
}

class Home extends Component {
  constructor(props) {
    super(props);

    this.actions = props.actions;

    this.state = {
      project: props.project
    };
  }

  componentWillMount() {}

  render() {
    let sprints = this.state.project.features.length;
    let tasks =
      Object.keys(this.state.project.tasks).reduce((a, b) => {
        return a + this.state.project.tasks[b].length;
      }, 0) || 0;
    let hours =
      Object.keys(this.state.project.tasks).reduce((a, b) => {
        let days = this.state.project.tasks[b].reduce(function(a, b) {
          return a + (parseInt(b['min'], 10) + parseInt(b['max'], 10)) / 2;
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
            <Statistic.Value>{sprints}</Statistic.Value>
            <Statistic.Label>Sprints</Statistic.Label>
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
