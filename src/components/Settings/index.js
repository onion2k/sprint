import React, { Component } from 'react';
import { Form, Header, Select } from 'semantic-ui-react'
import './Settings.css';
import { connect } from 'react-redux';
import * as actions from '../../data/actions'
import { bindActionCreators } from 'redux'

function mapStateToProps(state) {
    console.log(state);
    return { project: state.project };
}

function mapDispatchToProps(dispatch) {
    return { actions: bindActionCreators(actions, dispatch) }
}

const options = [
    { key: 'elanders', text: 'Elanders', value: 'elanders' },
    { key: 'orchard', text: 'Orchard', value: 'orchard' },
]

class Settings extends Component {

    constructor(props) {
        super(props);
        console.log(props);
        this.actions = props.actions;
        this.state = {
            project: props.project.title,
            client: 'elanders',
            description: ''
        }
    }

    updateTask(task){
        let t = this.state.tasks;
        // let tc = t[this.props.match.params.sprint].find((t)=>{ return t.id === task.id});
        // tc = task;
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

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
