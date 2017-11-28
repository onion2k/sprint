import React, { Component } from 'react';
import {
    Link
} from 'react-router-dom';
import './Sidebar.css';

class Sidebar extends Component {
  render() {
    return (
        <aside>

            <nav>
                <Link to="/settings">Project Settings</Link>
            </nav>

            <section>
                <Link to="/editor/1">Sprint 1</Link>
            </section>
            <section>
                <Link to="/editor/2">Sprint 2</Link>
            </section>
            <section>
                <Link to="/editor/3">Sprint 3</Link>
            </section>
            <section>
                <Link to="/editor/4">Sprint 4</Link>
            </section>
        </aside>
    );
  }
}

export default Sidebar;
