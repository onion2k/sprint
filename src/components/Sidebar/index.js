import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { List } from "semantic-ui-react";
import "./Sidebar.css";

function mapStateToProps(state) {
  return { project: state.projectReducer };
}

function mapDispatchToProps(dispatch) {
  return {};
}

class Sidebar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      project: props.project.title,
      features: props.project.features,
      feature: props.project.feature,
      tasks: props.project.tasks
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      project: nextProps.project.title,
      features: nextProps.project.features,
      tasks: nextProps.project.tasks,
      feature: nextProps.project.feature
    });
  }

  render() {
    let features = this.state.features.map(id => {
      let feature = this.state.feature[id];
      let hours = this.state.tasks[id].reduce((a, b) => {
        return a + (b.min + b.max) / 2;
      }, 0);
      return (
        <List.Item key={id}>
          <List.Content>
            <List.Header as={Link} to={"/project/" + id}>
              {feature.title}
            </List.Header>
            <List.Description>{hours} hours</List.Description>
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
