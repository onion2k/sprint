import React, { Component } from 'react';

class ProjectTitle extends Component {
    render(){
        let className = this.props.title ? "" : "pending";
        return (<h1 className={ className }>{ this.props.title || '____________' }</h1>);
    }
}

export default ProjectTitle;
