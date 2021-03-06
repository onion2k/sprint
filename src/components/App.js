import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
  // withRouter
} from "react-router-dom";

import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducers from "../data/reducers";

import { Container, Menu, Dropdown } from "semantic-ui-react";
import "./App.css";

import Sidebar from "./Sidebar";
import Home from "./Home";
import Project from "./Project";
import Settings from "./Settings";
import Estimates from "./Estimates";
import Rates from "./Rates";
import Templates from "./Templates";

import * as projectActions from "../data/projectActions";

let store = createStore(reducers, applyMiddleware(thunk));

class App extends Component {
  constructor() {
    super();

    store.dispatch(projectActions.load("abc"));

    this.newProject = this.newProject.bind(this);
  }

  newProject() {
    console.log("New!");
  }

  render() {
    return (
      <Provider store={store}>
        <Router>
          <div>
            <Menu fixed="top" inverted>
              <Container className="App">
                <Menu.Item as={Link} to="/" header>
                  Estimates
                </Menu.Item>
                <Menu.Menu position="right">
                  <Sidebar />
                  <Dropdown item icon="ellipsis vertical">
                    <Dropdown.Menu style={{ minWidth: "200px" }}>
                      <Dropdown.Header>Home</Dropdown.Header>{" "}
                      <Dropdown.Item
                        as={Link}
                        to="/"
                        description="cmd + h"
                        text="Home"
                      />
                      <Dropdown.Divider />
                      <Dropdown.Header>Project</Dropdown.Header>{" "}
                      <Dropdown.Item
                        as={Link}
                        to="/settings"
                        description="cmd + p"
                        text="Project Settings"
                      />
                      <Dropdown.Item
                        as={Link}
                        to="/project/new"
                        description="cmd + f"
                        text="New Feature"
                      />
                      <Dropdown.Divider />
                      <Dropdown.Header>Estimates</Dropdown.Header>
                      <Dropdown.Item
                        as={Link}
                        to="/estimates"
                        description="cmd + e"
                        text="Estimates"
                      />
                      <Dropdown.Item
                        as={Link}
                        to="/rates"
                        description="cmd + r"
                        text="Rates"
                      />
                      <Dropdown.Item
                        as={Link}
                        to="/templates"
                        description="cmd + t"
                        text="Templates"
                      />
                      <Dropdown.Divider />
                      <Dropdown.Header>Logout</Dropdown.Header>
                      <Dropdown.Item
                        as={Link}
                        to="/logout"
                        description="Bye!"
                        text="Logout"
                      />
                    </Dropdown.Menu>
                  </Dropdown>
                </Menu.Menu>
              </Container>
            </Menu>

            <Container>
              <main>
                <Route path="/" exact component={Home} />
                <Route path="/login" component={Login} />
                <Route path="/project/:feature?" component={Project} />
                <Route path="/settings" component={Settings} />
                <Route path="/estimates" component={Estimates} />
                <Route path="/rates" component={Rates} />
                <Route path="/templates" component={Templates} />
              </main>
            </Container>
          </div>
        </Router>
      </Provider>
    );
  }
}

const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    this.isAuthenticated = true;
    setTimeout(cb, 100); // fake async
  },
  signout(cb) {
    this.isAuthenticated = false;
    setTimeout(cb, 100);
  }
};

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
  };

  login = () => {
    fakeAuth.authenticate(() => {
      this.setState({ redirectToReferrer: true });
    });
  };

  render() {
    const { from } = this.props.location.state || { from: { pathname: "/" } };
    const { redirectToReferrer } = this.state;

    if (redirectToReferrer) {
      return <Redirect to={from} />;
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
