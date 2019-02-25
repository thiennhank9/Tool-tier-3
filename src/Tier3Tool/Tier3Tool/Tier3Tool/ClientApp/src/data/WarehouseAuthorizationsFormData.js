import CONTROL_TYPES from './FormControlTypesData';

const { SELECT, INPUT, DATE_PICKER } = CONTROL_TYPES;

export default function getWarehouseAuthorizationsFormData() {
  const {
    JURISDICTION,
    AGENCY_ID,
    FIRSTNAME,
    LASTNAME,
    MEMBERID,
    ADMISSION_TYPE,
    SERVICE,
    AUTH_REF_NO,
    FTP_FILE_NAME,
    AUTH_BEGIN,
    AUTH_END,
    UPDATED_FROM,
    UPDATED_TO
  } = this.props.globalStore.locales;

  const {
    jurisdictions,
    jurisdiction,
    agencyID,
    firstName,
    lastName,
    memberID,
    admissionType,
    service,
    authRefNo,
    ftpFileName,
    authBegin,
    updatedFrom,
    authEnd,
    updatedTo
  } = this.props.warehouseAuthorizationsStore;

  return [
    [
      {
        type: SELECT,
        label: JURISDICTION,
        value: jurisdiction,
        options: jurisdictions,
        onChange: this.props.onChangeJurisdiction
      },
      {
        type: INPUT,
        label: AGENCY_ID,
        value: agencyID,
        onChange: this.props.onChangeAgencyID
      }
    ],
    [
      {
        type: INPUT,
        label: FIRSTNAME,
        value: firstName,
        onChange: this.props.onChangeFirstName
      },
      {
        type: INPUT,
        label: LASTNAME,
        value: lastName,
        onChange: this.props.onChangeLastName
      }
    ],
    [
      {
        type: INPUT,
        label: MEMBERID,
        value: memberID,
        onChange: this.props.onChangeMemberID
      },
      {
        type: INPUT,
        label: ADMISSION_TYPE,
        value: admissionType,
        onChange: this.props.onChangeAdmissionType
      }
    ],
    [
      {
        type: INPUT,
        label: SERVICE,
        value: service,
        onChange: this.props.onChangeService
      }
    ],
    [
      {
        type: INPUT,
        label: AUTH_REF_NO,
        value: authRefNo,
        onChange: this.props.onChangeAuthRefNo
      },
      {
        type: INPUT,
        label: FTP_FILE_NAME,
        value: ftpFileName,
        onChange: this.props.onChangeFTPFileName
      }
    ],
    [
      {
        type: DATE_PICKER,
        label: AUTH_BEGIN,
        value: authBegin,
        onChange: this.props.onChangeAuthBegin
      },
      {
        type: DATE_PICKER,
        label: UPDATED_FROM,
        value: updatedFrom,
        onChange: this.props.onChangeUpdatedFrom
      }
    ],
    [
      {
        type: DATE_PICKER,
        label: AUTH_END,
        value: authEnd,
        onChange: this.props.onChangeAuthEnd
      },
      {
        type: DATE_PICKER,
        label: UPDATED_TO,
        value: updatedTo,
        onChange: this.props.onChangeUpdatedTo
      }
    ]
  ];
}
