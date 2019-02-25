export default function getColumns(typeName = 'Warehouse') {
  return [
    { Header: 'Connection Name', accessor: 'connectionName' },
    { Header: typeName, accessor: 'displayServerName' }
  ];
}
