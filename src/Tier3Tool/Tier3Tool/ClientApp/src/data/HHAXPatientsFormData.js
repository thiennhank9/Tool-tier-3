const CONTROL_TYPES = {
  SELECT: 'select',
  INPUT: 'input',
  DATE_PICKER: 'date-picker',
  LABEL: 'label',
  SELECT_AGENCY: 'select-agency'
};

const { INPUT, DATE_PICKER, LABEL, SELECT_AGENCY } = CONTROL_TYPES;

export default function getHHAXPatientsFormData(context) {
  const {
    TRANS_ID, 
    TRANS_STATUS,
    AGENCY_ID,
    FIRSTNAME,
    LASTNAME,
    PATIENT_ID,
    ADMISSION,
    STATUS,
    MR_NUMBER,
    INSERTED_DATE_RANGE,
    MODIFIED_DATE_RANGE,
    FROM,
    TO
  } = context.props.globalStore.locales;
  const { agencies } = context.state;

  return [
    [{ type: SELECT_AGENCY, label: AGENCY_ID, valueName: 'agencyID', options: agencies }],
    [
      { type: INPUT, label: FIRSTNAME, valueName: 'firstName', initalValue: '' },
      { type: INPUT, label: LASTNAME, valueName: 'lastName', initalValue: '' }
    ],
    [
      { type: INPUT, label: PATIENT_ID, valueName: 'patientID', initalValue: '' },
      { type: INPUT, label: ADMISSION, valueName: 'admissionID', initalValue: '' }
    ],
    [
      { type: INPUT, label: STATUS, valueName: 'status', initalValue: '' },
      { type: INPUT, label: MR_NUMBER, valueName: 'mrNumber', initalValue: '' }
    ],
    [
      { type: INPUT, label: TRANS_ID, valueName: 'transID', initalValue: '' },
      { type: INPUT, label: TRANS_STATUS, valueName: 'transStatus', initalValue: '' }
    ],
    [{ type: LABEL, label: INSERTED_DATE_RANGE }, { type: LABEL, label: MODIFIED_DATE_RANGE }],
    [
      { type: DATE_PICKER, label: FROM, valueName: 'insertedDateFrom', initalValue: null },
      { type: DATE_PICKER, label: FROM, valueName: 'modifiedDateFrom', initalValue: null }
    ],
    [
      { type: DATE_PICKER, label: TO, valueName: 'insertedDateTo', initalValue: null },
      { type: DATE_PICKER, label: TO, valueName: 'modifiedDateTo', initalValue: null }
    ]
  ];
}
