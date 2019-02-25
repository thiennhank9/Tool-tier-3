import React from 'react';

export default function getColumns() {
  return [
    { Header: 'Account', accessor: 'username' },
    {
      Header: 'Access 1st tool',
      accessor: 'canAccessDw',
      Cell: row => <span className={row.value ? 'icon-ok' : ''} />
    },
    {
      Header: 'Access 2nd tool',
      accessor: 'canAccessHhax',
      Cell: row => <span className={row.value ? 'icon-ok' : ''} />
    },
    {
      Header: 'Is Admin',
      accessor: 'isAdmin',
      Cell: row => <span className={row.value ? 'icon-ok' : ''} />
    }
  ];
}
