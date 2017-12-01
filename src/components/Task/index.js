import React, { Component } from 'react';
import { Divider, Popup, Button, Checkbox, Form, Input, Radio, Select, TextArea } from 'semantic-ui-react'
import './Task.css';

class Task extends Component {

    constructor(props){
        super(props);
        this.state = {
            task: props.task
        }
    }

    handleChange = (e, { name, value }) => {
        let task = this.state.task;
        task[name] = value;
        this.setState({ task: task });
        this.props.update(task);
    };
    
    render() {

        const { task } = this.state;

        return (
            <Form key={task.id} style={{ backgroundColor: '#f8f8f8', padding: '15px 15px 0', marginBottom: '15px', border: '1px solid #eee' }}>
                <Form.Group>
                    <Form.Field required width={8}>
                        <label>Task Title</label>
                        <input name='title' placeholder='What is it...' value={task.title} onChange={ this.handleChange } />
                    </Form.Field>
                    <Form.Input name='min' required width={3} label='Minimum Hours' placeholder='3.5' value={task.min} onChange={ this.handleChange } />
                    <Form.Input name='max' required width={3} label='Maximum Hours' placeholder='100' value={task.max} onChange={ this.handleChange } />
                    <Form.Field>
                        <Popup
                            trigger={<Button content='Delete' style={{ marginTop: '25px' }} />}
                            content={<Button color='red' content='Are you sure?' />}
                            on='click'
                            position='top right'
                        />
                    </Form.Field>
                </Form.Group>
            </Form>
        );
    }
}

export default Task;
