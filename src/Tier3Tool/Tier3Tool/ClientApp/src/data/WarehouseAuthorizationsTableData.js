export default function getWarehouseAuthorizationsTableData(locales) {
  const {
    AGENCY_ID,
    FULL_NAME,
    ADMISSION_TYPE,
    CLIENT_OTHER_ID,
    SERVICE,
    EVENT_CODE,
    AUTH_REF_NO,
    FORMAT,
    MAX,
    BEGIN,
    END,
    DIAG_10_CODE,
    AUTH_SHARED,
    AUTH_VOIDED,
    ROW_MODIFIED,
    ROW_CREATED,
    IS_PROCESSED,
    FTP_FILE_NAME
  } = locales;

  return [
    { Header: AGENCY_ID, accessor: 'agencyID' },
    { Header: FULL_NAME, accessor: 'fullName', width: 300 },
    {
      Header: ADMISSION_TYPE,
      accessor: 'admissionType',
      width: 140
    },
    {
      Header: CLIENT_OTHER_ID,
      accessor: 'clientOtherID'
    },
    { Header: SERVICE, accessor: 'authServiceID' },
    { Header: EVENT_CODE, accessor: 'eventCode' },
    { Header: AUTH_REF_NO, accessor: 'authRefNo' },
    { Header: FORMAT, accessor: 'format' },
    { Header: MAX, accessor: 'max' },
    { Header: BEGIN, accessor: 'begin' },
    { Header: END, accessor: 'end' },
    { Header: DIAG_10_CODE, accessor: 'diag10Code' },
    {
      Header: AUTH_SHARED,
      accessor: 'authShared'
    },
    {
      Header: AUTH_VOIDED,
      accessor: 'authVoided'
    },
    {
      Header: ROW_MODIFIED,
      accessor: 'rowModified'
    },
    { Header: ROW_CREATED, accessor: 'rowCreated' },
    {
      Header: IS_PROCESSED,
      accessor: 'isProcessed'
    },
    {
      Header: FTP_FILE_NAME,
      accessor: 'ftpFileName',
      width: 550,
      style: { 'white-space': 'unset' }
    }
  ];
}
