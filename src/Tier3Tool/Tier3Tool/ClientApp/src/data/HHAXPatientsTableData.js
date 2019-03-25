export default function getColumns(locales) {
  const {
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
    { Header: PATIENT_ID, accessor: 'patientID', width: 150 },
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
