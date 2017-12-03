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
            features: ['abcdef123','abcdef456','abcdef789','abcdef100'],
            feature: {
                'abcdef123': { title: 'Feature 1', total: 75, type: 'code' },
                'abcdef456': { title: 'Feature 2', total: 15, type: 'image' },
                'abcdef789': { title: 'Feature 3', total: 3.75, type: 'code' },
                'abcdef100': { title: 'Feature 4', total: 37.5, type: 'code' }
            }
        };

    }
        

    render() {

        let features = this.state.features.map((id) => {
            let feature = this.state.feature[id];
            return (
                <List.Item key={ id }>
                    <List.Icon name={ feature.type } verticalAlign='middle' />
                    <List.Content>
                        <List.Header as={Link} to={'/editor/'+id}>{ feature.title }</List.Header>
                        <List.Description>{ feature.total / 7.5 } days</List.Description>
                    </List.Content>
                </List.Item>
            )
        });


        return (
            <aside>

                <List divided relaxed className="Features">
                    { features }
                </List>

            </aside>
        );
    }
}

export default Sidebar;
