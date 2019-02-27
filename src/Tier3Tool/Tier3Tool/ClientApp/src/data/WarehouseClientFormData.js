const CONTROL_TYPES = {
  SELECT: 'select',
  INPUT: 'input',
  DATE_PICKER: 'date-picker'
};

export default function getWarehouseClientFormData() {
  const {
    JURISDICTION,
    FIRSTNAME,
    LASTNAME,
    MEMBERID,
    ADMISSION_TYPE,
    UPDATED_FROM,
    UPDATED_TO,
    FTP_FILE_NAME
  } = this.props.globalStore.locales;

  const {
    jurisdictions,
    jurisdiction,
    firstName,
    lastName,
    memberID,
    admissionType,
    updatedFrom,
    updatedTo,
    ftpFileName
  } = this.props.warehouseClientStore;

  return [
    [
      {
        type: CONTROL_TYPES.SELECT,
        label: JURISDICTION,
        value: jurisdiction,
        options: jurisdictions,
        onChange: this.props.onChangeJurisdiction
      }
    ],
    [
      {
        type: CONTROL_TYPES.INPUT,
        label: FIRSTNAME,
        value: firstName,
        onChange: this.props.onChangeFirstName
      },
      {
        type: CONTROL_TYPES.INPUT,
        label: LASTNAME,
        value: lastName,
        onChange: this.props.onChangeLastName
      }
    ],
    [
      {
        type: CONTROL_TYPES.INPUT,
        label: MEMBERID,
        value: memberID,
        onChange: this.props.onChangeMemberID
      },
      {
        type: CONTROL_TYPES.INPUT,
        label: ADMISSION_TYPE,
        value: admissionType,
        onChange: this.props.onChangeAdmissionType
      }
    ],
    [
      {
        type: CONTROL_TYPES.DATE_PICKER,
        label: UPDATED_FROM,
        value: updatedFrom,
        onChange: this.props.onChangeUpdatedFrom
      },
      {
        type: CONTROL_TYPES.INPUT,
        label: FTP_FILE_NAME,
        value: ftpFileName,
        onChange: this.props.onChangeFTPFileName
      }
    ],
    [
      {
        type: CONTROL_TYPES.DATE_PICKER,
        label: UPDATED_TO,
        value: updatedTo,
        onChange: this.props.onChangeUpdatedTo
      }
    ]
  ];
}
