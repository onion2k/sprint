import React, { Component } from "react";
import "./Project.css";
import { connect } from "react-redux";
import * as projectActions from "../../data/projectActions";
import { bindActionCreators } from "redux";
import { Form, Button, Grid, Header, Statistic } from "semantic-ui-react";
import Task from "../Task";

function mapStateToProps(state) {
  return { project: state.projectReducer };
}

function mapDispatchToProps(dispatch) {
  return { projectActions: bindActionCreators(projectActions, dispatch) };
}

class Project extends Component {
  constructor(props) {
    super(props);

    this.projectActions = props.projectActions;
    this.project = props.project;

    this.state = {
      project: this.project,
      featureId: this.props.match.params.feature,
      feature: this.project.feature[this.props.match.params.feature],
      tasks: this.project.feature[this.props.match.params.feature].tasks
    };

    this.handleChange = this.handleChange.bind(this);
    this.updateTask = this.updateTask.bind(this);
    this.deleteTask = this.deleteTask.bind(this);

    this.save = this.save.bind(this);
    this.saveAsTemplate = this.saveAsTemplate.bind(this);
    this.delete = this.delete.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    let state = {
      project: this.project,
      featureId: nextProps.match.params.feature,
      feature: this.project.feature[nextProps.match.params.feature],
      tasks: this.project.feature[nextProps.match.params.feature].tasks
    };
    this.setState(state);
  }

  deleteTask(task) {
    let t = this.state.tasks;
    t.splice(t.indexOf(task.id), 1);
    this.setState({ tasks: t });
  }

  updateTask(task) {
    let t = this.state.tasks;
    if (task.id === null) {
      let newtask = Object.assign({}, task);
      newtask.id = "new";
      t.push(newtask);
    } else {
      t[task.id] = task;
    }
    this.setState({ tasks: t });
  }

  handleChange = e => {
    const target = e.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    let feature = this.state.feature;
    feature[name] = value;

    console.log(feature);

    this.setState({ feature: feature });
  };

  save() {
    // console.log(this.state.featureId);
    // console.log(this.state.project);
    // console.log(this.state.feature);
    // console.log(this.state.project.feature[this.props.match.params.feature]);
    this.projectActions.updateFeature(this.state.feature);
  }

  saveAsTemplate() {
    this.projectActions.saveAsTemplate(this.state.feature);
  }

  delete() {
    this.projectActions.deleteFeature(this.props.history, this.state.featureId);
  }

  render() {
    let tasks = this.state.tasks.map(task => {
      return (
        <Task
          key={task.id}
          task={task}
          update={this.updateTask}
          delete={this.deleteTask}
        />
      );
    });

    let min =
      this.state.tasks.reduce(function(a, b) {
        return a + parseInt(b["min"], 10);
      }, 0) || 0;
    let max =
      this.state.tasks.reduce(function(a, b) {
        return a + parseInt(b["max"], 10);
      }, 0) || 0;
    let avg = this.state.tasks.reduce(function(a, b) {
      return a + (b.min + b.max) / 2;
    }, 0);

    let cnt = avg - min;
    let risk = 0;
    if (min > 0) {
      risk = max / min;
    }

    return (
      <article className="Project">
        <Header as="h1" dividing>
          {this.state.project.title} / {this.state.feature.title}
        </Header>

        <Statistic.Group widths="four">
          <Statistic>
            <Statistic.Value>{avg}</Statistic.Value>
            <Statistic.Label>Hours Quoted</Statistic.Label>
          </Statistic>
          <Statistic>
            <Statistic.Value>{min}</Statistic.Value>
            <Statistic.Label>Required Hours</Statistic.Label>
          </Statistic>
          <Statistic>
            <Statistic.Value>{cnt}</Statistic.Value>
            <Statistic.Label>Contingency</Statistic.Label>
          </Statistic>
          <Statistic>
            <Statistic.Value>{Math.round(risk)}</Statistic.Value>
            <Statistic.Label>Risk</Statistic.Label>
          </Statistic>
        </Statistic.Group>

        <Header as="h2" dividing>
          Feature Details
        </Header>

        <Form style={{ marginBottom: "15px" }}>
          <Form.Field required>
            <label>Feature Title</label>
            <input
              name="title"
              placeholder="What is it..."
              value={this.state.feature.title}
              onChange={this.handleChange}
            />
          </Form.Field>
        </Form>

        <Header as="h2" dividing>
          Tasks
        </Header>

        <div>
          <Form className="taskTitles" columns={3}>
            <Form.Group>
              <Form.Field width={10}>
                <label>Title</label>
              </Form.Field>
              <Form.Field width={2}>
                <label>Minimum</label>
              </Form.Field>
              <Form.Field width={2}>
                <label>Maximum</label>
              </Form.Field>
            </Form.Group>
          </Form>

          {tasks}
          <Task
            task={{
              id: null,
              title: "",
              min: "",
              max: "",
              type: "",
              comments: ""
            }}
            update={this.updateTask}
          />
        </div>

        <Header as="h2" dividing>
          Risks
        </Header>

        <Form style={{ marginBottom: "15px" }}>
          <Form.TextArea
            name="risks"
            label="Risks"
            value={this.state.risks}
            placeholder="What are the unknowns? Why might this feature be hard?"
            onChange={this.handleChange}
          />
        </Form>

        <Header as="h2" dividing>
          Actions
        </Header>

        <Grid columns={2}>
          <Grid.Row>
            <Grid.Column>
              <Button negative onClick={this.delete}>
                Delete Feature
              </Button>
            </Grid.Column>
            <Grid.Column style={{ textAlign: "right" }}>
              <Button onClick={this.saveAsTemplate}>Save As Template</Button>
              <Button positive onClick={this.save}>
                Save Feature
              </Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </article>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Project);
