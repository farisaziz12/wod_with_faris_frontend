import React, { Component } from 'react';
import './Classes.css'

export default class DatePick extends Component {




  render() {
    const { handleChange, date, nextDay, prevDay } = this.props
    return (
      <div className='date-picker-container'>
        <span onClick={prevDay} ><i className="i left"></i></span><input onChange={handleChange} value={date} className='date-picker' type='date' name='date'/><span onClick={nextDay}><i className="i right"></i></span>
      </div>
    );
  }
}