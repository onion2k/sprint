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

        this.state = {
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

    componentWillReceiveProps(nextProps){

    }

    updateTask(task){
        let t = this.state.tasks;
        // let tc = t[this.props.match.params.sprint].find((t)=>{ return t.id === task.id});
        // tc = task;
        this.setState({ tasks: t });
    }

    handleChange = (e) => {
        this.setState({ project: e.target.value });
    };

    render() {

        let tasks = this.state.tasks[this.props.match.params.feature].map((task) => {
            return <Task key={task.id} task={ task } update={this.updateTask} />
        });

        let min = this.state.tasks[this.props.match.params.feature].reduce( function(a, b){ return a + parseInt(b['min'], 10); }, 0) || 0;
        let max = this.state.tasks[this.props.match.params.feature].reduce( function(a, b){ return a + parseInt(b['max'], 10); }, 0) || 0;
        let avg = this.state.tasks[this.props.match.params.feature].reduce( function(a, b){ return a + ( (parseInt(b['min'], 10)+parseInt(b['max'], 10)) / 2 ); }, 0);

        let cnt = avg - min;
        let risk = 0;
        if (min > 0) {
            risk = max / min;
        }
        
        return (
            <article className="Editor">
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

                <Header as='h2' dividing>Feature Details</Header>

                <Form style={{ marginBottom: '15px' }}>
                    <Form.Field required>
                        <label>Feature Title</label>
                        <input name='project' placeholder='What is it...' value={ this.state.project } onChange={ this.handleChange } />
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
                    <Task task={{ id: '', title:'', min: '', max: '', type: 'DEVELOPMENT', comments: '' }} />
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
