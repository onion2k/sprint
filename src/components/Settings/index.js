import React, { Component } from 'react';
import { Form, Button, Container, Divider, Grid, Header, Image, Menu, Segment, Statistic, Select } from 'semantic-ui-react'
import './Settings.css';
import firebase from '../../firebase.js';

const options = [
    { key: 'elanders', text: 'Elanders', value: 'elanders' },
    { key: 'orchard', text: 'Orchard', value: 'orchard' },
]

class Settings extends Component {
    constructor() {
        super();
        this.state = {
            project: '',
            client: 'elanders',
            description: ''
        }
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

    handleChange = (e, {name, value}) => {
        this.setState({ [name]: value });
    };
 
    render() {
        return (
            <article className="Settings">
                <Header as='h1' dividing>{ this.state.project }</Header>

                <Form style={{ marginBottom: '15px' }}>
                    <Form.Field required>
                        <label>Project Title</label>
                        <input name='project' placeholder='What is the project called...' value={ this.state.project } onChange={ this.handleChange } />
                    </Form.Field>
                    <Form.Field name='client' required control={Select} label='Client' options={options} value={this.state.client} placeholder='Client' onChange={ this.handleChange } />
                </Form>

                <Header as='h2' dividing>Description</Header>

                <Form style={{ marginBottom: '15px' }}>
                    <Form.TextArea name='description' label='Description' value={this.state.description} placeholder='What would we be building?' onChange={ this.handleChange } />
                </Form>

            </article>
        );
    }
}

export default Settings;
