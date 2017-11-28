import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect,
    withRouter
} from 'react-router-dom';
import './App.css';

import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Home from './Home';
import Editor from './Editor';
import Settings from './Settings';

class App extends Component {
  render() {
    return (
        <Router>
            <div className="App">
                <Navbar />
                <main>
                    <Sidebar />
                    <Route path="/" exact component={ Home }/>
                    <Route path="/login" component={Login}/>
                    <Route path="/editor/:sprint?" component={ Editor }/>
                    <Route path="/settings" component={ Settings }/>
                </main>
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
