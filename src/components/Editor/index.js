import React, { Component } from 'react';
import './Editor.css';
import { connect } from 'react-redux';
import * as actions from '../../data/actions'
import { bindActionCreators } from 'redux'
import { Form, Button, Grid, Header, Statistic, Select } from 'semantic-ui-react'

import Task from '../Task';

function mapStateToProps(state) {
    return { project: state.projectReducer };
}

function mapDispatchToProps(dispatch) {
    return { actions: bindActionCreators(actions, dispatch) }
}

const options = [
    { key: 'design', text: 'Design', value: 'design' },
    { key: 'development', text: 'Development', value: 'development' },
]

class Editor extends Component {

    constructor(props) {

        super(props);

        this.actions = props.actions;

        // this.actions.project('TITLE');

        this.project = {
            project: props.project.title,
            type: 'development',
            task: 'design',
            risks: 'design',
            features: ['abcdef123','abcdef456','abcdef789','abcdef100'],
            feature: {
                'abcdef123': { title: 'Feature 1', total: 75 },
                'abcdef456': { title: 'Feature 2', total: 15 },
                'abcdef789': { title: 'Feature 3', total: 3.75 },
                'abcdef100': { title: 'Feature 4', total: 37.5 }
            },
            tasks: {
                'abcdef123': [
                    { id: 'task123', title:'Task 1', min: 25, max: 50, type: 'development', comments: 'Blah blah blah' }, 
                    { id: 'task234', title:'Task 2', min: 5, max: 37.5, type: 'design', comments: '' }, 
                    { id: 'task456', title:'Task 3', min: 5, max: 25, type: 'projectmanagement', comments: '' }, 
                    { id: 'task567', title:'Task 4', min: 5, max: 15, type: 'development', comments: '' }
                ],
                'abcdef456': [],
                'abcdef789': [],
                'abcdef100': []
            }
        };

        this.state = {
            project: this.project.project,
            feature: this.project.feature[this.props.match.params.feature],
            tasks: this.project.tasks[this.props.match.params.feature]
        }

        this.handleChange = this.handleChange.bind(this);
        this.updateTask = this.updateTask.bind(this);
        this.deleteTask = this.deleteTask.bind(this);

    }

    componentWillReceiveProps(nextProps){

    }

    updateTask(task){
        let t = this.state.tasks;
        if (task.id===null) {
            let newtask = Object.assign({}, task);
            newtask.id = 'new';
            t.push(newtask);
        } else {
            t[task.id] = task;
        }
        this.setState({ tasks: t });
    }

    deleteTask(task){
        let t = this.state.tasks;
        t.splice(t.indexOf(task.id), 1);
        this.setState({ tasks: t });
    }

    handleChange = (e) => {

        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        let feature = this.state.feature;
        feature[name] = value;
 
        this.setState({ feature: feature });

    };

    render() {

        let tasks = this.state.tasks.map((task) => {
            return <Task key={task.id} task={ task } update={this.updateTask} delete={this.deleteTask} />
        });

        let min = this.state.tasks.reduce( function(a, b){ return a + parseInt(b['min'], 10); }, 0) || 0;
        let max = this.state.tasks.reduce( function(a, b){ return a + parseInt(b['max'], 10); }, 0) || 0;
        let avg = this.state.tasks.reduce( function(a, b){ return a + ( (parseInt(b['min'], 10)+parseInt(b['max'], 10)) / 2 ); }, 0);

        let cnt = avg - min;
        let risk = 0;
        if (min > 0) {
            risk = max / min;
        }
        
        return (
            <article className="Editor">
                <Header as='h1' dividing>{ this.state.project } / { this.state.feature.title }</Header>

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

                <Header as='h2' dividing>Feature Details</Header>

                <Form style={{ marginBottom: '15px' }}>
                    <Form.Field required>
                        <label>Feature Title</label>
                        <input name='title' placeholder='What is it...' value={ this.state.feature.title } onChange={ this.handleChange } />
                    </Form.Field>
                    <Form.Field name='type' required control={Select} label='Type' options={options} value={this.state.type} placeholder='Type' onChange={ this.handleChange } />
                </Form>

                <Header as='h2' dividing>Risks</Header>

                <Form style={{ marginBottom: '15px' }}>
                    <Form.TextArea name='risks' label='Risks' value={this.state.risks} placeholder='What are the unknowns? Why might this feature be hard?' onChange={ this.handleChange } />
                </Form>

                <Header as='h2' dividing>Tasks</Header>

                <div>
                    { tasks }
                    <Task task={{ id: null, title:'', min: '', max: '', type: '', comments: ''  }} update={this.updateTask} />
                </div>

                <Header as='h2' dividing>Actions</Header>

                <Grid columns={2}>
                    <Grid.Row>
                        <Grid.Column><Button negative>Delete Feature</Button></Grid.Column>
                        <Grid.Column style={{ textAlign: 'right' }}><Button positive>Save Feature</Button></Grid.Column>
                    </Grid.Row>
                </Grid>

            </article>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Editor);
