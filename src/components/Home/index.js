import React, { Component } from 'react';
import './Home.css';
import { connect } from 'react-redux';
import * as actions from '../../data/actions'
import { bindActionCreators } from 'redux'
import { Header, Statistic } from 'semantic-ui-react'

function mapStateToProps(state) {
    return { project: state.projectReducer };
}

function mapDispatchToProps(dispatch) {
    return { actions: bindActionCreators(actions, dispatch) }
}

class Home extends Component {

    constructor(props) {
        
        super(props);

        this.actions = props.actions;

        this.state = {
            project: props.project.title,
        }
    }

    componentWillMount() {

    }

    render() {
    return (
        <article className='Home'>

            <Header as='h1' dividing>{ this.state.project }</Header>

            <Statistic.Group widths='four'>
                <Statistic>
                    <Statistic.Value>4</Statistic.Value>
                    <Statistic.Label>Sprints</Statistic.Label>
                </Statistic>

                <Statistic>
                    <Statistic.Value>32</Statistic.Value>
                    <Statistic.Label>Tasks</Statistic.Label>
                </Statistic>

                <Statistic>
                    <Statistic.Value>71</Statistic.Value>
                    <Statistic.Label>Days</Statistic.Label>
                </Statistic>

                <Statistic>
                    <Statistic.Value>
                    3
                    </Statistic.Value>
                    <Statistic.Label>Users</Statistic.Label>
                </Statistic>
            </Statistic.Group>
        </article>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
