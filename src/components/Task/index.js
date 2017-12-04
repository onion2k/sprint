import React, { Component } from 'react';
import { Popup, Button, Form } from 'semantic-ui-react'
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

        let button = null;
        if (task.id !== null) {
            button = <Popup
                trigger={<Button icon='delete' style={{ marginTop: '24px' }} />}
                content={<Button color='red' content='Are you sure?' />}
                on='click'
                position='top right'
            />;
        } else {
            button = <Button positive icon='check' style={{ marginTop: '24px' }} />;
        }
        
        return (
            <Form className='Task' key={task.id}>
                <Form.Group>
                    <Form.Field required width={10}>
                        <label>Task Title</label>
                        <input name='title' placeholder='What is it...' value={task.title} onChange={ this.handleChange } />
                    </Form.Field>
                    <Form.Input name='min' required width={2} label='Minimum' placeholder='3.5' value={task.min} onChange={ this.handleChange } />
                    <Form.Input name='max' required width={2} label='Maximum' placeholder='100' value={task.max} onChange={ this.handleChange } />
                    <Form.Field width={1}>
                        <Button icon='code' style={{ marginTop: '24px' }} />
                    </Form.Field>
                    <Form.Field width={1}>
                        { button }
                    </Form.Field>
                </Form.Group>
            </Form>
        );
    }
}

export default Task;
