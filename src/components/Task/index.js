import React, { Component } from 'react';
import { Divider, Button, Checkbox, Form, Input, Radio, Select, TextArea } from 'semantic-ui-react'
import './Task.css';

const options = [
    { key: 'design', text: 'Design', value: 'design' },
    { key: 'development', text: 'Development', value: 'development' },
]

class Task extends Component {

    handleChange = (e, { value }) => this.setState({ value })
    
    render() {
        return (
            <Form key={this.props.task.id}>
                <Form.Field required width={16}>
                    <label>Task</label>
                    <input placeholder='What is it...' value={this.props.task.title} />
                </Form.Field>
                <Form.Group>
                    <Form.Input required width={3} label='Minimum Hours' placeholder='3.5' value={this.props.task.min} />
                    <Form.Input required width={3} label='Maximum Hours' placeholder='100' value={this.props.task.max} />
                    <Form.Field required width={6} control={Select} label='Task type' options={options} placeholder='Design, or development, or...' />
                    <Form.Button width={2} label='Delete'>Danger</Form.Button>
                    <Form.Button width={2} label='Move'>Move</Form.Button>
                </Form.Group>
                <Divider section />
            </Form>
        );
    }
}

export default Task;
