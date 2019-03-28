import React from 'react';
import moment from 'moment';
import { merge, isNil } from 'lodash';

export function resetScrollInsideTable(indexTable) {
  try {
    let tableBody = document.getElementsByClassName('rt-tbody')[indexTable];
    tableBody.scrollTop = 0;
  } catch (error) {
    console.log(error);
  }
}

export function createTooltipTableColumns(columns) {
  return columns.map(column =>
    merge(column, {
      Cell: row => (
        <div>
          <span title={row.value}>{row.value}</span>
        </div>
      )
    })
  );
}

export function formatDateInTable(dateValue) {
  return isNil(dateValue)
    ? null
    : moment(dateValue)
        .format('MM/DD/YYYY')
        .toString();
}
