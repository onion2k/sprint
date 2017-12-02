import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect,
    withRouter
} from 'react-router-dom';
import { Button, Container, Divider, Grid, Header, Image, Menu, Segment, Dropdown } from 'semantic-ui-react'
import './App.css';

import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Home from './Home';
import Editor from './Editor';
import Settings from './Settings';
import Estimates from './Estimates';
import Templates from './Templates';

class App extends Component {
  render() {
    return (
        <Router>
            <div>
                <Menu fixed='top' inverted>
                    <Container className="App">
                        <Menu.Item as={Link} to="/" header>Sprinter</Menu.Item>
                        <Menu.Menu position='right'>
                            <Menu.Item as='a'>New Sprint</Menu.Item>
                            <Menu.Item as={Link} to='/settings'>Project Settings</Menu.Item>
                            <Dropdown item icon='ellipsis vertical'>
                                <Dropdown.Menu style={{ minWidth:'200px' }}>
                                    <Dropdown.Item as={Link} to='/estimates' description='cmd + e' text='Estimates' />
                                    <Dropdown.Item as={Link} to='/templates' description='cmd + t' text='Templates' />
                                    <Dropdown.Divider />
                                    <Dropdown.Header>Logout</Dropdown.Header>
                                    <Dropdown.Item>Logout</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Menu.Menu>
                    </Container>
                </Menu>

                <Container>
                    <main style={{ marginTop: '4.0rem' }}>
                        <Sidebar />
                        <Route path="/" exact component={ Home }/>
                        <Route path="/login" component={Login}/>
                        <Route path="/editor/:sprint?" component={ Editor }/>
                        <Route path="/settings" component={ Settings }/>
                        <Route path="/estimates" component={ Estimates }/>
                        <Route path="/templates" component={ Templates }/>
                    </main>
                </Container>
            </div>
        </Router>
    );
  }
}


const fakeAuth = {
    isAuthenticated: false,
    authenticate(cb) {
        this.isAuthenticated = true
        setTimeout(cb, 100) // fake async
    },
    signout(cb) {
        this.isAuthenticated = false
        setTimeout(cb, 100)
    }
}

const AuthButton = withRouter(({ history }) => (
    fakeAuth.isAuthenticated ? (
        <p>
        Welcome! <button onClick={() => {
            fakeAuth.signout(() => history.push('/'))
        }}>Sign out</button>
        </p>
    ) : (
        <p>You are not logged in.</p>
    )
))

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        fakeAuth.isAuthenticated ? (
        <Component {...props}/>
        ) : (
        <Redirect to={{
            pathname: '/login',
            state: { from: props.location }
        }}/>
        )
    )}/>
)

class Login extends React.Component {
    state = {
        redirectToReferrer: false
    }

    login = () => {
        fakeAuth.authenticate(() => {
            this.setState({ redirectToReferrer: true })
        })
    }

    render() {

        const { from } = this.props.location.state || { from: { pathname: '/' } }
        const { redirectToReferrer } = this.state
        
        if (redirectToReferrer) {
            return (
                <Redirect to={from}/>
            )
        }
        
        return (
            <div>
            <p>You must log in to view the page at {from.pathname}</p>
            <button onClick={this.login}>Log in</button>
            </div>
        );

    }
}

export default App;
