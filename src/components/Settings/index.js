import React, { Component } from "react";
import { Form, Button, Header, Select, Grid } from "semantic-ui-react";
import "./Settings.css";
import { connect } from "react-redux";
import * as projectActions from "../../data/projectActions";
import { bindActionCreators } from "redux";

function mapStateToProps(state) {
  return { project: state.projectReducer };
}

function mapDispatchToProps(dispatch) {
  return { boundActions: bindActionCreators(projectActions, dispatch) };
}

const options = [
  { key: "elanders", text: "Elanders", value: "elanders" },
  { key: "orchard", text: "Orchard", value: "orchard" }
];

class Settings extends Component {
  constructor(props) {
    super(props);

    this.saveProject = props.boundActions.project;

    this.state = {
      project: props.project.title,
      client: props.project.client,
      description: props.project.description
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = e => {
    const target = e.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({ [name]: value });
  };

  callSaveProject = () => {
    this.saveProject({ title: this.state.project });
  };

  render() {
    return (
      <article className="Settings">
        <Header as="h1" dividing>
          {this.state.project}
        </Header>

        <Form style={{ marginBottom: "15px" }}>
          <Form.Field required>
            <label>Project Title</label>
            <input
              name="project"
              placeholder="What is the project called..."
              value={this.state.project}
              onChange={this.handleChange}
            />
          </Form.Field>
          <Form.Field
            name="client"
            required
            control={Select}
            label="Client"
            options={options}
            value={this.state.client}
            placeholder="Client"
            onChange={this.handleChange}
          />
        </Form>

        <Header as="h2" dividing>
          Description
        </Header>

        <Form style={{ marginBottom: "15px" }}>
          <Form.TextArea
            name="description"
            label="Description"
            value={this.state.description}
            placeholder="What would we be building?"
            onChange={this.handleChange}
          />
        </Form>

        <Header as="h2" dividing>
          Actions
        </Header>

        <Grid columns={2}>
          <Grid.Row>
            <Grid.Column>
              <Button negative>Delete Project</Button>
            </Grid.Column>
            <Grid.Column style={{ textAlign: "right" }}>
              <Button positive onClick={this.callSaveProject}>
                Save Project
              </Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </article>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
