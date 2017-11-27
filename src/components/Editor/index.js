import React, { Component } from 'react';
import './Editor.css';

import Sprint from '../Sprint';
import SprintPager from '../SprintPager';

class Editor extends Component {
  render() {
    return (
        <article className="Editor">
            <SprintPager />
            <div>
                <Sprint id="1" />
                <Sprint id="2" />
                <Sprint id="3" />
                <Sprint id="4" />
                <Sprint id="5" />
            </div>
        </article>
    );
  }
}

export default Editor;
