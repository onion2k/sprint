import React, { Component } from 'react';
import {
    Link
} from 'react-router-dom';
import { List } from 'semantic-ui-react'
import './Sidebar.css';

class Sidebar extends Component {

    constructor() {

        super();

        this.state = {
            project: 'Super Cool React App',
            sprints: ['abcdef123','abcdef456','abcdef789','abcdef100'],
            sprint: {
                'abcdef123': { title: 'Sprint 1', total: 75, type: 'code' },
                'abcdef456': { title: 'Sprint 2', total: 15, type: 'image' },
                'abcdef789': { title: 'Sprint 3', total: 3.75, type: 'code' },
                'abcdef100': { title: 'Sprint 4', total: 37.5, type: 'code' }
            }
        };

    }
        

    render() {

        let sprints = this.state.sprints.map((id) => {
            let sprint = this.state.sprint[id];
            return (
                <List.Item key={ id }>
                    <List.Icon name={ sprint.type } verticalAlign='middle' />
                    <List.Content>
                        <List.Header as={Link} to={'/editor/'+id}>{ sprint.title }</List.Header>
                        <List.Description>{ sprint.total / 7.5 } days</List.Description>
                    </List.Content>
                </List.Item>
            )
        });


        return (
            <aside>

                <List divided relaxed className="Sprints">
                    { sprints }
                </List>

            </aside>
        );
    }
}

export default Sidebar;
