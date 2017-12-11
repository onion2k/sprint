import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../data/actions';
import { bindActionCreators } from 'redux';
import { List } from 'semantic-ui-react';
import './Sidebar.css';

function mapStateToProps(state) {
  return { project: state.projectReducer };
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actions, dispatch) };
}

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.actions = props.actions;

    this.state = {
      project: props.project.title,
      features: props.project.features,
      feature: props.project.feature
    };
  }

  render() {
    let features = this.state.features.map(id => {
      let feature = this.state.feature[id];
      return (
        <List.Item key={id}>
          <List.Icon name={feature.type} verticalAlign="middle" />
          <List.Content>
            <List.Header as={Link} to={'/editor/' + id}>
              {feature.title}
            </List.Header>
            <List.Description>{feature.total / 7.5} days</List.Description>
          </List.Content>
        </List.Item>
      );
    });

    return (
      <aside>
        <List divided relaxed className="Features">
          {features}
        </List>
      </aside>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
