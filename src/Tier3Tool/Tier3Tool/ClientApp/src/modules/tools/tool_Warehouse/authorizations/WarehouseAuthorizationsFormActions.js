import { compose, withHandlers } from 'recompose';
import { resetScrollInsideTable } from 'src/utils/utils';

export default compose(
  withHandlers({
    getJurisdictions: props => connection => {
      props.warehouseAuthorizationsStore.requestGetJurisdicions(connection,props);
    },
    onChangeJurisdiction: props => e => {
      props.warehouseAuthorizationsStore.setJurisdiction(e.target.value);
    },
    onChangeAgencyID: props => e => {
      props.warehouseAuthorizationsStore.setAgencyID(e.target.value);
    },
    onChangeFirstName: props => e => {
      props.warehouseAuthorizationsStore.setFirstName(e.target.value);
    },
    onChangeLastName: props => e => {
      props.warehouseAuthorizationsStore.setLastName(e.target.value);
    },
    onChangeMemberID: props => e => {
      props.warehouseAuthorizationsStore.setMemberID(e.target.value);
    },
    onChangeAdmissionType: props => e => {
      props.warehouseAuthorizationsStore.setAdmissionType(e.target.value);
    },
    onChangeService: props => e => {
      props.warehouseAuthorizationsStore.setService(e.target.value);
    },
    onChangeAuthRefNo: props => e => {
      props.warehouseAuthorizationsStore.setAuthRefNo(e.target.value);
    },
    onChangeFTPFileName: props => e => {
      props.warehouseAuthorizationsStore.setFtpFileName(e.target.value);
    },
    onChangeAuthBegin: props => date => {
      props.warehouseAuthorizationsStore.setAuthBegin(date);
    },
    onChangeUpdatedFrom: props => date => {
      props.warehouseAuthorizationsStore.setUpdatedFrom(date);
    },
    onChangeAuthEnd: props => date => {
      props.warehouseAuthorizationsStore.setAuthEnd(date);
    },
    onChangeUpdatedTo: props => date => {
      props.warehouseAuthorizationsStore.setUpdatedTo(date);
    },
    handleClickClear: props => e => {
      props.warehouseAuthorizationsStore.clearAuthorizationSearch();
    },
    handleClickSearch: props => connection => {
      const paging = {
        pageSize: props.warehouseAuthorizationsStore.pageSize,
        page: 0
      }
      props.warehouseAuthorizationsStore.setPage(0);
      props.warehouseAuthorizationsStore.requestGetAuthorizationResults(connection, paging, props);
      resetScrollInsideTable(1);
    }
  })
);
