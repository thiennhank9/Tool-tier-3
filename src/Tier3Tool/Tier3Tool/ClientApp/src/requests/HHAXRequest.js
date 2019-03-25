import appRequest from './AppRequest';
import { isNil, merge } from 'lodash';

function getDateJSONLocal(date) {
  return new Date(date.getTime() - date.getTimezoneOffset() * 60000).toJSON();
}

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
      insertedDateFrom: !isNil(insertedDateFrom) ? getDateJSONLocal(insertedDateFrom) : null,
      modifiedDateFrom: !isNil(modifiedDateFrom) ? getDateJSONLocal(modifiedDateFrom) : null,
      insertedDateTo: !isNil(insertedDateTo) ? getDateJSONLocal(insertedDateTo) : null,
      modifiedDateTo: !isNil(modifiedDateTo) ? getDateJSONLocal(modifiedDateTo) : null
    };

    const objPatientSearch = merge(patientSearch, objFormat);

    return appRequest.post('/HHAX/get-patients', { connection, patientSearch: objPatientSearch, paging }, config);
  },
  getAuthorizations(connection, authorizationSearch, paging, token = localStorage.getItem('token')) {
    const config = {
      headers: { Authorization: 'bearer ' + token }
    };

    let { agencyID, authDateBegin, authDateEnd, modifiedDateFrom, modifiedDateTo } = authorizationSearch;

    if (agencyID === '') {
      agencyID = null;
    }
    if (typeof authDateBegin === 'string') {
      authDateBegin = new Date(authDateBegin);
    }
    if (typeof to === 'string') {
      authDateEnd = new Date(authDateEnd);
    }
    if (typeof begin === 'string') {
      modifiedDateFrom = new Date(modifiedDateFrom);
    }
    if (typeof end === 'string') {
      modifiedDateTo = new Date(modifiedDateTo);
    }

    const objFormat = {
      agencyID,
      authDateBegin: !isNil(authDateBegin) ? getDateJSONLocal(authDateBegin) : null,
      authDateEnd: !isNil(authDateEnd) ? getDateJSONLocal(authDateEnd) : null,
      modifiedDateFrom: !isNil(modifiedDateFrom) ? getDateJSONLocal(modifiedDateFrom) : null,
      modifiedDateTo: !isNil(modifiedDateTo) ? getDateJSONLocal(modifiedDateTo) : null
    };

    const objAuthorizationSearch = merge(authorizationSearch, objFormat);
    return appRequest.post(
      '/HHAX/get-authorizations',
      { connection, authorizationSearch: objAuthorizationSearch, paging },
      config
    );
  }
};
