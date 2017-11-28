import React, { Component } from 'react';
import {
    Link
} from 'react-router-dom';
import './Sidebar.css';

class Sidebar extends Component {

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
            }
        };

    }
        

    render() {

        let sprints = this.state.sprints.map((id) => {
            let sprint = this.state.sprint[id];
            let height = (sprint.total*3)+'px';
            let style = {
                minHeight: height
            }
            return (<li key={ id } style={ style }>
                <Link to={'/editor/'+id}>
                    { sprint.title }
                    <span>{ sprint.total / 7.5 } days</span>
                    <span>Delete Sprint</span>
                </Link>
            </li>)
        });


        return (
            <aside>

                <nav>
                    <Link to="/settings">Project Settings</Link>
                </nav>

                <ul className="Sprints">
                    { sprints }
                </ul>

                <nav>
                    <Link to="/newsprint">New Sprint</Link>
                </nav>

            </aside>
        );
    }
}

export default Sidebar;
