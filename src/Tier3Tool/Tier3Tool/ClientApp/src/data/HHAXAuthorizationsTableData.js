export default function getColumns(locales) {
  const {
    TRANS_ID,
    TRANS_STATUS,
    TRANS_STATUS_MESSAGE,
    AGENCY_ID,
    AUTH_ID,
    FULL_NAME,
    ADMISSION,
    MR_NUMBER,
    AUTH_REF_NO,
    SERVICE,
    BILLING_SERVICE_CODE,
    BEGIN,
    END,
    MODIFIED_DATE,
    INVALID_DATA
  } = locales;

  return [
    { Header: TRANS_ID, accessor: 'transID', width: 100 },
    { Header: TRANS_STATUS, accessor: 'transStatus', width: 120 },
    { Header: TRANS_STATUS_MESSAGE, accessor: 'transStatusMessage', width: 250 },
    { Header: AGENCY_ID, accessor: 'agencyID', width: 150 },
    { Header: FULL_NAME, accessor: 'fullName', width: 300 },
    {
      Header: ADMISSION,
      accessor: 'admissionID'
    },
    {
      Header: MR_NUMBER,
      accessor: 'mrNumber'
    },
    {
      Header: AUTH_ID,
      accessor: 'authID'
    },
    { Header: AUTH_REF_NO, accessor: 'authRefNo' },
    {
      Header: SERVICE,
      accessor: 'service'
    },
    {
      Header: BILLING_SERVICE_CODE,
      accessor: 'billingServiceCode'
    },
    {
      Header: BEGIN,
      accessor: 'authDateBegin'
    },
    {
      Header: END,
      accessor: 'authDateEnd'
    },
    {
      Header: MODIFIED_DATE,
      accessor: 'modifiedDate'
    },
    {
      Header: INVALID_DATA,
      accessor: 'invalidData'
    }
  ];
}
