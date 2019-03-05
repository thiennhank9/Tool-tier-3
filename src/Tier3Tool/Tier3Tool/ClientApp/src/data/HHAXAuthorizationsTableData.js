export default function getColumns(locales) {
  const {
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
    { Header: FULL_NAME, accessor: "fullName" },
    {
      Header: ADMISSION,
      accessor: "admissionID"
    },
    {
      Header: MR_NUMBER,
      accessor: "mrNumber"
    },
    {
      Header: AUTH_ID,
      accessor: "authID"
    },
    { Header: AUTH_REF_NO, accessor: "authRefNo" },
    {
      Header: SERVICE,
      accessor: "service"
    },
    {
      Header: BILLING_SERVICE_CODE,
      accessor: "billingServiceCode"
    },
    {
      Header: BEGIN,
      accessor: "authDateBegin"
    },
    {
      Header: END,
      accessor: "authDateEnd"
    },
    {
      Header: MODIFIED_DATE,
      accessor: "modifiedDate"
    },
    {
      Header: INVALID_DATA,
      accessor: "invalidData"
    }
  ];
}
