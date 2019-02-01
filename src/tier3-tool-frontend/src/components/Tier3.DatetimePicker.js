import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';

class DatetimePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: new Date()
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(date) {
    this.setState({
      startDate: date
    });
  }

  render() {
    return (
      <DatePicker
        peekNextMonth
        fixedHeight
        showMonthDropdown
        showYearDropdown
        dropdownMode="select"
        selected={this.state.startDate}
        onChange={this.handleChange}
        className="form-control extend-width-datepicker"
      />
    );
  }
}

export default DatetimePicker;
