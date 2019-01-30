import React from 'react';

export default function getColumns() {
  return [
    { Header: 'Account', accessor: 'account' },
    {
      Header: 'Access 1st tool',
      accessor: 'accessTool1',
      Cell: row => <span className={row.value ? 'icon-ok' : 'icon-not-ok'} />
    },
    {
      Header: 'Access 2nd tool',
      accessor: 'accessTool2',
      Cell: row => <span className={row.value ? 'icon-ok' : 'icon-not-ok'} />
    }
  ];
}
