import React, { Component } from "react";
import { Popup, Button, Grid } from "semantic-ui-react";

const icons = {
  development: "code",
  design: "grid layout",
  projectmanagement: "users"
};

class TaskTypeSelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      type: props.type,
      update: props.update
    };
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.setType = this.setType.bind(this);
  }

  handleOpen() {
    this.setState({ isOpen: true });
  }

  handleClose = () => {
    this.setState({ isOpen: false });
  };

  setType(e) {
    this.state.update(e);
    this.setState({ isOpen: false, type: e });
  }

  render() {
    return (
      <Popup
        wide
        trigger={
          <Button
            icon={icons[this.state.type] || "help"}
            style={{ marginTop: "24px" }}
          />
        }
        on="click"
        open={this.state.isOpen}
        onClose={this.handleClose}
        onOpen={this.handleOpen}
        position="top center"
      >
        <Grid divided columns="equal">
          <Grid.Column>
            <Popup
              trigger={
                <Button
                  color="red"
                  icon="code"
                  fluid
                  onClick={() => this.setType("development")}
                />
              }
              content="Development"
              position="top center"
              size="tiny"
              inverted
            />
          </Grid.Column>
          <Grid.Column>
            <Popup
              trigger={
                <Button
                  color="blue"
                  icon="grid layout"
                  fluid
                  onClick={() => this.setType("design")}
                />
              }
              content="Design"
              position="top center"
              size="tiny"
              inverted
            />
          </Grid.Column>
          <Grid.Column>
            <Popup
              trigger={
                <Button
                  color="green"
                  icon="users"
                  fluid
                  onClick={() => this.setType("projectmanagement")}
                />
              }
              content="Project Management"
              position="top center"
              size="tiny"
              inverted
            />
          </Grid.Column>
        </Grid>
      </Popup>
    );
  }
}

export default TaskTypeSelector;
