import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';

import { observer } from 'mobx-react';

@observer
class DatetimePicker extends Component {
  render() {
    let { selected, onChange } = this.props;

    if (typeof selected === 'string') {
      selected = new Date(selected);
    }

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
