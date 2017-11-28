import React, { Component } from 'react';
import './Editor.css';

import Task from '../Task';
import SprintPager from '../SprintPager';

class Editor extends Component {

    constructor() {

        super();

        this.state = {
            project: 'Super Cool React App',
            sprints: ['abcdef123','abcdef456','abcdef789','abcdef100'],
            sprint: {
                'abcdef123': { title: 'Sprint 1', total: 75 },
                'abcdef456': { title: 'Sprint 2', total: 15 },
                'abcdef789': { title: 'Sprint 3', total: 3.75 },
                'abcdef100': { title: 'Sprint 4', total: 37.5 }
            },
            tasks: {
                'abcdef123': [
                    { id: 'task123', title:'Task 1', min: 25, max: 50, type: 'DEVELOPMENT' }, 
                    { id: 'task234', title:'Task 2', min: 5, max: 37.5, type: 'DEVELOPMENT' }, 
                    { id: 'task456', title:'Task 3', min: 5, max: 25, type: 'DESIGN' }, 
                    { id: 'task567', title:'Task 4', min: 5, max: 15, type: 'DEVELOPMENT' }
                ],
                'abcdef456': [],
                'abcdef789': [],
                'abcdef100': []
            }
        };

    }

    render() {

        let tasks = this.state.tasks[this.props.match.params.sprint].map((task) => {
            return <Task key={task.id} task={ task } />
        });

        return (
            <article className="Editor">
                <SprintPager prev={ 'abcdef100' } next={ 'abcdef789' } />
                <h1>{ this.state.project } - { this.state.sprint[this.props.match.params.sprint].title }</h1>
                <div>
                    { tasks }
                </div>
            </article>
        );
    }
}

export default Editor;
