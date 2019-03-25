export default function getColumns(locales) {
  const {
    FULL_NAME,
    ADMISSION_TYPE,
    CLIENT_OTHER_ID,
    CLIENT_CUSTOM_ID,
    DIAG_10_CODE,
    ROW_CREATED,
    ROW_MODIFIED,
    IS_PROCESSED
  } = locales;

  return [
    { Header: FULL_NAME, accessor: 'fullName', width: 300 },
    {
      Header: ADMISSION_TYPE,
      accessor: 'admissionType'
    },
    {
      Header: CLIENT_OTHER_ID,
      accessor: 'clientOtherID'
    },
    {
      Header: CLIENT_CUSTOM_ID,
      accessor: 'clientCustomID'
    },
    { Header: DIAG_10_CODE, accessor: 'diag10Code' },
    {
      Header: ROW_CREATED,
      accessor: 'rowCreated'
    },
    {
      Header: ROW_MODIFIED,
      accessor: 'rowModified'
    },
    {
      Header: IS_PROCESSED,
      accessor: 'isProcessed'
    }
  ];
}
