import React, { Component } from 'react';
import './Classes.css'

export default class DatePick extends Component {




  render() {
    const { handleChange, date, handleOffset } = this.props
    return (
      <div className='date-picker-container'>
        <span onClick={() => handleOffset(-1)} ><i className="i left"></i></span><input onChange={handleChange} value={date} className='date-picker' type='date' name='date'/><span onClick={() => handleOffset(1)}><i className="i right"></i></span>
      </div>
    );
  }
}