import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './SprintPager.css';

class SprintPager extends Component {
  render() {
    return (
        <div>
          <Link to={ '/editor/'+this.props.prev }>Previous Sprint</Link>
          <Link to={ '/editor/'+this.props.next }>Next Sprint</Link>
        </div>
    );
  }
}

export default SprintPager;
