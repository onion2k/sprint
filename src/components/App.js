import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect,
    // withRouter
} from 'react-router-dom';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from '../data/reducers';

import { Container, Menu, Dropdown } from 'semantic-ui-react'
import './App.css';

import Sidebar from './Sidebar';
import Home from './Home';
import Editor from './Editor';
import Settings from './Settings';
import Estimates from './Estimates';
import Templates from './Templates';

let store = createStore(reducers, applyMiddleware(thunk));

class App extends Component {
    constructor() {
        super();

        this.newProject = this.newProject.bind(this);
    }

    newProject() {
        console.log("New!");
    }

    render() {
        return (
            <Router>
                <Provider store={store}>
                    <div>
                        <Menu fixed='top' inverted>
                            <Container className="App">
                                <Menu.Item as={Link} to="/" header>Estimates</Menu.Item>
                                <Menu.Menu position='right'>
                                    <Menu.Item as='a'>New Feature</Menu.Item>
                                    <Menu.Item as={Link} to='/settings'>Project Settings</Menu.Item>
                                    <Dropdown item icon='ellipsis vertical'>
                                        <Dropdown.Menu style={{ minWidth:'200px' }}>
                                            <Dropdown.Item as={Link} to='/' description='cmd + h' text='Home' />
                                            <Dropdown.Item as={Link} to='/settings' description='cmd + p' text='Project Settings' />
                                            <Dropdown.Item as={Link} to='/feature' description='cmd + f' text='New Feature' />
                                            <Dropdown.Divider />
                                            <Dropdown.Header>Estimates</Dropdown.Header>
                                            <Dropdown.Item as='a' onClick={ this.newProject } description='cmd + n' text='New Estimate' />
                                            <Dropdown.Item as={Link} to='/estimates' description='cmd + e' text='Estimates' />
                                            <Dropdown.Item as={Link} to='/templates' description='cmd + t' text='Templates' />
                                            <Dropdown.Divider />
                                            <Dropdown.Header>Logout</Dropdown.Header>
                                            <Dropdown.Item as={Link} to='/logout' description='Bye!' text='Logout' />
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </Menu.Menu>
                            </Container>
                        </Menu>

                        <Container>
                            <main>
                                <Sidebar />
                                <Route path="/" exact component={ Home }/>
                                <Route path="/login" component={Login}/>
                                <Route path="/editor/:feature?" component={ Editor }/>
                                <Route path="/settings" component={ Settings }/>
                                <Route path="/estimates" component={ Estimates }/>
                                <Route path="/templates" component={ Templates }/>
                            </main>
                        </Container>
                    </div>
                </Provider>
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

// const AuthButton = withRouter(({ history }) => (
//     fakeAuth.isAuthenticated ? (
//         <p>
//         Welcome! <button onClick={() => {
//             fakeAuth.signout(() => history.push('/'))
//         }}>Sign out</button>
//         </p>
//     ) : (
//         <p>You are not logged in.</p>
//     )
// ))

// const PrivateRoute = ({ component: Component, ...rest }) => (
//     <Route {...rest} render={props => (
//         fakeAuth.isAuthenticated ? (
//         <Component {...props}/>
//         ) : (
//         <Redirect to={{
//             pathname: '/login',
//             state: { from: props.location }
//         }}/>
//         )
//     )}/>
// )

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
