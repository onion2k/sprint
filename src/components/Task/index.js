import React, { Component } from "react";
import { Popup, Button, Form } from "semantic-ui-react";
import "./Task.css";

import TaskTypeSelector from "./TaskTypeSelector";

class Task extends Component {
  constructor(props) {
    super(props);
    this.state = {
      task: props.task
    };
    this.setType = this.setType.bind(this);
  }

  handleChange = e => {
    const target = e.target;
    let name = target.name;
    let value;
    if (name === "min" || name === "max") {
      if (target.value) {
        value = parseFloat(target.value);
      } else {
        value = 0;
      }
    } else {
      value = target.type === "checkbox" ? target.checked : target.value;
    }

    let task = this.state.task;
    task[name] = value;

    this.setState({ task: task }, () => {
      if (task.id === null) {
        return;
      }
      this.props.update(task);
    });
  };

  setType = e => {
    let task = this.state.task;
    task.type = e;
    this.setState({ task: task });
    if (task.id !== null) {
      this.props.update(this.state.task);
    }
  };

  deleteTask = e => {
    this.props.delete(this.state.task);
  };

  addTask = e => {
    this.props.update(this.state.task);
    this.setState({
      task: {
        id: null,
        title: "",
        min: "",
        max: ""
      }
    });
  };

  render() {
    const { task } = this.state;

    let button = null;
    if (task.id !== null) {
      button = (
        <Popup
          trigger={<Button icon="delete" />}
          content={
            <Button
              color="red"
              content="Are you sure?"
              onClick={this.deleteTask}
            />
          }
          on="click"
          position="top right"
        />
      );
    } else {
      button = <Button positive icon="check" onClick={this.addTask} />;
    }

    return (
      <Form className="Task" key={task.id}>
        <Form.Group>
          <Form.Input
            name="title"
            required
            width={10}
            placeholder="What is it..."
            value={task.title}
            onChange={this.handleChange}
          />
          <Form.Input
            name="min"
            required
            width={2}
            placeholder="3.5"
            value={task.min}
            data-as="float"
            onChange={this.handleChange}
          />
          <Form.Input
            name="max"
            required
            width={2}
            placeholder="100"
            value={task.max}
            data-as="float"
            onChange={this.handleChange}
          />
          <Form.Field width={1}>
            <TaskTypeSelector type={task.type} update={this.setType} />
          </Form.Field>
          <Form.Field width={1}>{button}</Form.Field>
        </Form.Group>
      </Form>
    );
  }
}

export default Task;
