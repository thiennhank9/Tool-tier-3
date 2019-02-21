import { compose, withHandlers } from 'recompose';

export default compose(
  withHandlers({
    getJurisdictions: props => connection => {
      props.warehouseClientStore.requestGetJurisdicions(connection);
    },
    onChangeJurisdiction: props => e => {
      props.warehouseClientStore.setJurisdiction(e.target.value);
    },
    onChangeFirstName: props => e => {
      props.warehouseClientStore.setFirstName(e.target.value);
    },
    onChangeLastName: props => e => {
      props.warehouseClientStore.setLastName(e.target.value);
    },
    onChangeMemberID: props => e => {
      props.warehouseClientStore.setMemberID(e.target.value);
    },
    onChangeAdmissionType: props => e => {
      props.warehouseClientStore.setAdmissionType(e.target.value);
    },
    onChangeFTPFileName: props => e => {
      props.warehouseClientStore.setFtpFileName(e.target.value);
    },
    onChangeUpdatedFrom: props => date => {
      props.warehouseClientStore.setUpdatedFrom(date);
    },
    onChangeUpdatedTo: props => date => {
      props.warehouseClientStore.setUpdatedTo(date);
    },
    handleClickClear: props => e => {
      props.warehouseClientStore.clearClientSearch();
    },
    handleClickSearch: props => connection => {
      props.warehouseClientStore.requestGetClientResults(connection);
    }
  })
);
