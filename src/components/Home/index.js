import React, { Component } from 'react';
import './Home.css';
import { Icon, Image, Statistic } from 'semantic-ui-react'

class Home extends Component {
  render() {
    return (
        <article className='Home'>
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

export default Home;
