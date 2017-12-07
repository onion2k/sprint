import React, { Component } from 'react';
import { Popup, Button, Form, Grid } from 'semantic-ui-react'
import './Task.css';

const icons = {
    'development': 'code',
    'design': 'grid layout',
    'projectmanagement': 'users'
}

class Task extends Component {

    constructor(props){
        super(props);
        this.state = {
            task: props.task
        }
        this.setType = this.setType.bind(this);
    }

    handleChange = (e) => {
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        let task = this.state.task;
        task[name] = value;
 
        this.setState({ task: task }, ()=>{
            if (task.id===null) { return }
            this.props.update(this.state.task);
        });

    };

    setType = (e) => {
        let task = this.state.task;
        task.type = e;
        this.setState({ task: task });
        this.props.update(this.state.task);
        this.setState({ isOpen: false })
    }

    deleteTask = (e) => {
        this.props.delete(this.state.task);
    }

    addTask = (e) => {
        this.props.update(this.state.task);
    }

    render() {

        const { task } = this.state;

        let button = null;
        if (task.id !== null) {
            button = <Popup
                trigger={<Button icon='delete' style={{ marginTop: '24px' }} />}
                content={<Button color='red' content='Are you sure?' onClick={ this.deleteTask } />}
                on='click'
                position='top right'
            />;
        } else {
            button = <Button positive icon='check' style={{ marginTop: '24px' }} onClick={ this.addTask } />;
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
                        <Popup wide trigger={<Button icon={ icons[task.type] || 'help' } style={{ marginTop: '24px' }} />} on='click' position='top center'>
                            <Grid divided columns='equal'>
                            <Grid.Column>
                                <Popup
                                trigger={<Button color='red' icon='code' fluid onClick={()=>this.setType('development')} />}
                                content='Development'
                                position='top center'
                                size='tiny'
                                inverted
                                />
                            </Grid.Column>
                            <Grid.Column>
                                <Popup
                                trigger={<Button color='blue' icon='grid layout' fluid onClick={()=>this.setType('design')} />}
                                content='Design'
                                position='top center'
                                size='tiny'
                                inverted
                                />
                            </Grid.Column>
                            <Grid.Column>
                                <Popup
                                trigger={<Button color='green' icon='users' fluid onClick={()=>this.setType('projectmanagement')} />}
                                content='Project Management'
                                position='top center'
                                size='tiny'
                                inverted
                                />
                            </Grid.Column>
                            </Grid>
                        </Popup>
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
