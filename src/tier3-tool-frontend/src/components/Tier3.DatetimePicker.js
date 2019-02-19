import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';

class DatetimePicker extends Component {
  render() {
    const { selected, onChange } = this.props;

    return (
      <div className="customDatePickerWidth">
        <DatePicker
          peekNextMonth
          fixedHeight
          showMonthDropdown
          showYearDropdown
          dropdownMode="select"
          selected={selected}
          onChange={onChange}
          className="form-control"
        />
      </div>
    );
  }
}

export default DatetimePicker;
