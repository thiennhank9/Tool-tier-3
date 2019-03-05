const CONTROL_TYPES = {
  SELECT: 'select',
  INPUT: 'input',
  DATE_PICKER: 'date-picker',
  LABEL: 'label'
};

const { SELECT, INPUT, DATE_PICKER, LABEL } = CONTROL_TYPES;

export default function getHHAXAuthorizationsFormData(context) {
  const {
    AGENCY_ID,
    FIRSTNAME,
    LASTNAME,
    SERVICE,
    ADMISSION,
    AUTH_REF_NO,
    MR_NUMBER,
    AUTH_ID,
    AUTHORIZATION_DATE_RANGE,
    BEGIN,
    END,
    MODIFIED_DATE_RANGE,
    FROM,
    TO
  } = context.props.globalStore.locales;
  const { agencies } = context.state;

  return [
    [{ type: SELECT, label: AGENCY_ID, valueName: 'agencyID', options: agencies, initalValue: '' }],
    [
      { type: INPUT, label: FIRSTNAME, valueName: 'firstName', initalValue: '' },
      { type: INPUT, label: LASTNAME, valueName: 'lastName', initalValue: '' }
    ],
    [
      { type: INPUT, label: SERVICE, valueName: 'service', initalValue: '' },
      { type: INPUT, label: ADMISSION, valueName: 'admissionID', initalValue: '' }
    ],
    [
      { type: INPUT, label: AUTH_REF_NO, valueName: 'authRefNo', initalValue: '' },
      { type: INPUT, label: MR_NUMBER, valueName: 'mrNumber', initalValue: '' }
    ],
    [{ type: INPUT, label: AUTH_ID, valueName: 'authID', initalValue: '' }],
    [{ type: LABEL, label: AUTHORIZATION_DATE_RANGE }, { type: LABEL, label: MODIFIED_DATE_RANGE }],
    [
      { type: DATE_PICKER, label: BEGIN, valueName: 'authDateBegin', initalValue: new Date() },
      { type: DATE_PICKER, label: FROM, valueName: 'modifiedDateFrom', initalValue: new Date() }
    ],
    [
      { type: DATE_PICKER, label: END, valueName: 'authDateEnd', initalValue: new Date() },
      { type: DATE_PICKER, label: TO, valueName: 'modifiedDateTo', initalValue: new Date() }
    ]
  ];
}
