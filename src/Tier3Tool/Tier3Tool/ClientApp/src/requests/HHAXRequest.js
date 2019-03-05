import appRequest from './AppRequest';
import { isNil, merge } from 'lodash';

export default {
  getAgencies(connection, token = localStorage.getItem('token')) {
    const config = {
      headers: { Authorization: 'bearer ' + token }
    };

    return appRequest.post('/HHAX/get-agencies', connection, config);
  },
  getPatients(connection, patientSearch, paging, token = localStorage.getItem('token')) {
    const config = {
      headers: { Authorization: 'bearer ' + token }
    };

    let { agencyID, insertedDateFrom, modifiedDateFrom, insertedDateTo, modifiedDateTo } = patientSearch;

    if (agencyID === '') {
      agencyID = null;
    }
    if (typeof insertedDateFrom === 'string') {
      insertedDateFrom = new Date(insertedDateFrom);
    }
    if (typeof modifiedDateFrom === 'string') {
      modifiedDateFrom = new Date(modifiedDateFrom);
    }
    if (typeof insertedDateTo === 'string') {
      insertedDateTo = new Date(insertedDateTo);
    }
    if (typeof modifiedDateTo === 'string') {
      modifiedDateTo = new Date(modifiedDateTo);
    }

    const objFormat = {
      agencyID,
      insertedDateFrom: !isNil(insertedDateFrom) ? insertedDateFrom.toJSON() : null,
      modifiedDateFrom: !isNil(modifiedDateFrom) ? modifiedDateFrom.toJSON() : null,
      insertedDateTo: !isNil(insertedDateTo) ? insertedDateTo.toJSON() : null,
      modifiedDateTo: !isNil(modifiedDateTo) ? modifiedDateTo.toJSON() : null
    };

    const objPatientSearch = merge(patientSearch, objFormat);

    return appRequest.post('/HHAX/get-patients', { connection, patientSearch: objPatientSearch, paging }, config);
  },
  getAuthorizations(connection, authorizationSearch, paging, token = localStorage.getItem('token')) {
    const config = {
      headers: { Authorization: 'bearer ' + token }
    };

    let { agencyID, from, to, begin, end } = authorizationSearch;

    if (agencyID === '') {
      agencyID = null;
    }
    if (typeof from === 'string') {
      from = new Date(from);
    }
    if (typeof to === 'string') {
      to = new Date(to);
    }
    if (typeof begin === 'string') {
      begin = new Date(begin);
    }
    if (typeof end === 'string') {
      end = new Date(end);
    }

    const objFormat = {
      agencyID,
      from: !isNil(from) ? from.toJSON() : null,
      to: !isNil(to) ? to.toJSON() : null,
      begin: !isNil(begin) ? begin.toJSON() : null,
      end: !isNil(end) ? end.toJSON() : null
    };

    const objAuthorizationSearch = merge(authorizationSearch, objFormat);
    return appRequest.post('/HHAX/get-authorizations', { connection, authorizationSearch: objAuthorizationSearch, paging }, config);
  }
};
