import React, { Component } from 'react';
import './Classes.css'

export default class DatePick extends Component {




  render() {
    return (
      <div>
        <input onChange={this.props.handleChange} value={this.props.date} className='date-picker' type='date' name='date'/>
      </div>
    );
  }
}