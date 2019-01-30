export default function getColumns(typeName = 'Warehouse') {
  return [
    { Header: 'Connection Name', accessor: 'connectionName' },
    { Header: 'Admin', accessor: 'admin' },
    { Header: typeName, accessor: typeName === 'Warehouse' ? 'warehouse' : 'hhax' }
  ];
}
