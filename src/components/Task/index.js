import React, { Component } from 'react';
import './Task.css';

class Task extends Component {
    render() {
        return (
            <section key={this.props.task.id}>
                <div>
                    <div className="Title">
                        <label>Title</label><input type="text" value={ this.props.task.title } />
                    </div>
                    <div className="Type">
                        <label>Type</label> { this.props.task.type }
                    </div>
                </div>
                <div>
                    <div className="Min">
                        <label>Min</label><input type="text" value={ this.props.task.min } />
                    </div>
                    <div className="Max">
                        <label>Max</label><input type="text" value={ this.props.task.max } />
                    </div>
                </div>
                <p>{ this.props.task.comments || 'No comments' }</p>
            </section>
        );
    }
}

export default Task;
