export default function getColumns(locales) {
  const {
    HCO_ERROR_MESSAGE,
    TRANS_ID,
    TRANS_STATUS,
    TRANS_STATUS_MESSAGE,
    AGENCY_ID,
    PATIENT_ID,
    FULL_NAME,
    ADMISSION,
    MR_NUMBER,
    STATUS,
    DISCHARGE_DATE,
    INSERTED_DATE,
    MODIFIED_DATE,
    INVALID_DATA
  } = locales;

  return [
    { Header: TRANS_ID, accessor: 'transID', width: 100 },
    { Header: TRANS_STATUS, accessor: 'transStatus', width: 120 },
    { Header: TRANS_STATUS_MESSAGE, accessor: 'transStatusMessage', width: 340 },
    { Header: HCO_ERROR_MESSAGE, accessor: 'hcoErrorDesc', width: 300 },
    { Header: AGENCY_ID, accessor: 'agencyID', width: 100 },
    { Header: PATIENT_ID, accessor: 'patientID', width: 100 },
    { Header: FULL_NAME, accessor: 'fullName', width: 250 },
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
      Header: STATUS,
      accessor: 'status'
    },
    { Header: DISCHARGE_DATE, accessor: 'dischargeDate' },
    {
      Header: INSERTED_DATE,
      accessor: 'createdDate'
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
