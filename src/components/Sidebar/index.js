import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Dropdown } from "semantic-ui-react";
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
      let hours = this.state.feature[id].tasks.reduce((a, b) => {
        return a + (b.min + b.max) / 2;
      }, 0);
      return (
        <Dropdown.Item
          key={id}
          as={Link}
          to={"/project/" + id}
          description=" "
          text={feature.title}
        />
      );
    });

    return (
      <Dropdown item text="Features">
        <Dropdown.Menu style={{ minWidth: "200px" }}>
          <Dropdown.Header>Features</Dropdown.Header> {features}
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
