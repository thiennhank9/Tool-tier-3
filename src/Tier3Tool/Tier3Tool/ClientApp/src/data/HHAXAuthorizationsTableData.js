export default function getColumns(locales) {
  const {
    HCO_ERROR_MESSAGE,
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
    { Header: TRANS_STATUS_MESSAGE, accessor: 'transStatusMessage', width: 340 },
    { Header: HCO_ERROR_MESSAGE, accessor: 'hcoErrorDesc', width: 300 },
    { Header: AGENCY_ID, accessor: 'agencyID', width: 150 },
    { Header: FULL_NAME, accessor: 'fullName', width: 300 },
    {
      Header: ADMISSION,
      accessor: 'admissionID'
    },
    {
      Header: MR_NUMBER,
      accessor: 'mrNumber',
      width: 150
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
      accessor: 'billingServiceCode',
      width: 200
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
