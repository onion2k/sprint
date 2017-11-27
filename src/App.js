import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <a href="https://sprinter.io">Sprinter</a>
        </header>
        <main>
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
          <article>
            <nav>
              <a href="">Previous Sprint</a>
              <a href="">Next Sprint</a>
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
          </article>
        </main>
      </div>
    );
  }
}

export default App;
