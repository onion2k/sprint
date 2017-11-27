import React, { Component } from 'react';
import './Sidebar.css';

class Sidebar extends Component {
  render() {
    return (
        <aside>

            <nav>
                <a href="">Project Settings</a>
            </nav>

            <section>
                <h1>Sprint 1</h1>
            </section>
            <section>
                <h1>Sprint 2</h1>
            </section>
            <section>
                <h1>Sprint 3</h1>
            </section>
            <section>
                <h1>Sprint 4</h1>
            </section>
        </aside>
    );
  }
}

export default Sidebar;
