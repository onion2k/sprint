import React, { Component } from 'react';
import './Editor.css';
import firebase from '../../firebase.js';
import { Form, Button, Container, Divider, Grid, Header, Image, Menu, Segment, Statistic, Select } from 'semantic-ui-react'

import Task from '../Task';
import SprintPager from '../SprintPager';

const options = [
    { key: 'design', text: 'Design', value: 'design' },
    { key: 'development', text: 'Development', value: 'development' },
]

class Editor extends Component {

    constructor() {

        super();

        this.state = {
            project: '',
            task: 'design',
            sprints: ['abcdef123','abcdef456','abcdef789','abcdef100'],
            sprint: {
                'abcdef123': { title: 'Sprint 1', total: 75 },
                'abcdef456': { title: 'Sprint 2', total: 15 },
                'abcdef789': { title: 'Sprint 3', total: 3.75 },
                'abcdef100': { title: 'Sprint 4', total: 37.5 }
            },
            tasks: {
                'abcdef123': [
                    { id: 'task123', title:'Task 1', min: 25, max: 50, type: 'DEVELOPMENT', comments: 'Blah blah blah' }, 
                    { id: 'task234', title:'Task 2', min: 5, max: 37.5, type: 'DEVELOPMENT', comments: '' }, 
                    { id: 'task456', title:'Task 3', min: 5, max: 25, type: 'DESIGN', comments: '' }, 
                    { id: 'task567', title:'Task 4', min: 5, max: 15, type: 'DEVELOPMENT', comments: '' }
                ],
                'abcdef456': [],
                'abcdef789': [],
                'abcdef100': []
            }
        };

        this.handleChange = this.handleChange.bind(this);
        this.updateTask = this.updateTask.bind(this);

    }

    componentWillMount() {

        const project = firebase.database().ref('project');

        project.on('value', (snapshot) => {
            this.setState({ project: snapshot.val() });
        });

    }

    updateTask(task){
        let t = this.state.tasks;
        let tc = t[this.props.match.params.sprint].find((t)=>{ return t.id === task.id});
        tc = task;
        this.setState({ tasks: t });
    }

    handleChange = (e) => {

        this.setState({ project: e.target.value });

    };

    render() {

        let tasks = this.state.tasks[this.props.match.params.sprint].map((task) => {
            return <Task key={task.id} task={ task } update={this.updateTask} />
        });

        let a = 0;
        let min = this.state.tasks[this.props.match.params.sprint].reduce( function(a, b){ return a + parseInt(b['min'], 10); }, 0);
        let max = this.state.tasks[this.props.match.params.sprint].reduce( function(a, b){ return a + parseInt(b['max'], 10); }, 0);
        let avg = this.state.tasks[this.props.match.params.sprint].reduce( function(a, b){ return a + ( (parseInt(b['min'], 10)+parseInt(b['max'], 10)) / 2 ); }, 0);
        
        let cnt = avg - min;
        let risk = max / min;
        
        return (
            <article className="Editor" style={{ marginTop: '1.0rem'}}>
                <Header as='h1' dividing>{ this.state.project }</Header>

                <Statistic.Group widths='four'>
                    <Statistic>
                        <Statistic.Value>{ avg }</Statistic.Value>
                        <Statistic.Label>Hours Quoted</Statistic.Label>
                    </Statistic>
                    <Statistic>
                        <Statistic.Value>{ min }</Statistic.Value>
                        <Statistic.Label>Required Hours</Statistic.Label>
                    </Statistic>
                    <Statistic>
                        <Statistic.Value>{ cnt }</Statistic.Value>
                        <Statistic.Label>Contingency</Statistic.Label>
                    </Statistic>
                    <Statistic>
                        <Statistic.Value>{ Math.round(risk) }</Statistic.Value>
                        <Statistic.Label>Risk</Statistic.Label>
                    </Statistic>
                </Statistic.Group>

                <Header as='h2' dividing>Sprint Details</Header>

                <Form style={{ backgroundColor: '#f8f8f8', padding: '15px', marginBottom: '15px', border: '1px solid #eee' }}>
                    <Form.Field required>
                        <label>Sprint Title</label>
                        <input name='project' placeholder='What is it...' value={ this.state.project } onChange={ this.handleChange } />
                    </Form.Field>
                    <Form.Field name='type' required control={Select} label='Type' options={options} value={this.state.type} placeholder='Type' onChange={ this.handleChange } />
                </Form>

                <Header as='h2' dividing>Tasks</Header>

                <div>
                    { tasks }
                </div>

                <Header as='h2' dividing>Risks</Header>

                <Form style={{ backgroundColor: '#f8f8f8', padding: '15px', marginBottom: '15px', border: '1px solid #eee' }}>
                    <Form.TextArea name='risks' label='Risks' value={this.state.risks} placeholder='What are the unknowns? Why might this sprint be hard?' onChange={ this.handleChange } />
                </Form>

            </article>
        );
    }
}

export default Editor;
