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

    }

    render() {

        let tasks = this.state.tasks[this.props.match.params.sprint].map((task) => {
            return <Task key={task.id} task={ task } />
        });

        let min = this.state.tasks[this.props.match.params.sprint].reduce( function(a, b){ return a + b['min']; }, 0);
        let avg = this.state.tasks[this.props.match.params.sprint].reduce( function(a, b){ return a + (b['min']+b['max'])/2; }, 0);
        let max = this.state.tasks[this.props.match.params.sprint].reduce( function(a, b){ return a + b['max']; }, 0);

        return (
            <article className="Editor">
                <SprintPager prev={ 'abcdef100' } next={ 'abcdef789' } />
                <h1>{ this.state.project } - { this.state.sprint[this.props.match.params.sprint].title }</h1>
                <div>
                    { tasks }
                </div>
                <div>
                    Min hours: { min }<br />
                    Avg hours: { avg }<br />
                    Max hours: { max }
                </div>
            </article>
        );
    }
}

export default Editor;
