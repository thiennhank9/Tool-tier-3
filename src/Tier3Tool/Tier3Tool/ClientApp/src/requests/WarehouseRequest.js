import appRequest from './AppRequest';
import { isNil } from 'lodash';

function getDateJSONLocal(date) {
  return new Date(date.getTime() - date.getTimezoneOffset() * 60000).toJSON();
}

export default {
  getJurisdiction(connection, token = localStorage.getItem('token')) {
    const config = {
      headers: { Authorization: 'bearer ' + token }
    };

    return appRequest.post('/Warehouses/get-jurisdictions', { ...connection }, config);
  },
  searchWarehouseClients(connection, dataSearch, paging, token = localStorage.getItem('token')) {
    const config = {
      headers: { Authorization: 'bearer ' + token }
    };

    let {
      jurisdiction,
      firstName,
      lastName,
      memberID,
      admissionType,
      updatedFrom,
      updatedTo,
      ftpFileName
    } = dataSearch;

    if (typeof updatedFrom === 'string') {
      updatedFrom = new Date(updatedFrom);
    }
    if (typeof updatedTo === 'string') {
      updatedTo = new Date(updatedTo);
    }

    const clientSearch = {
      jurisdiction,
      firstName,
      lastName,
      memberID,
      admissionType,
      updatedFrom: !isNil(updatedFrom) ? getDateJSONLocal(updatedFrom) : null,
      updatedTo: !isNil(updatedTo) ? getDateJSONLocal(updatedTo) : null,
      ftpFileName
    };
    return appRequest.post('/Warehouses/search-clients', { connection, clientSearch, paging }, config);
  },
  searchWarehouseAuthorizations(connection, dataSearch, paging, token = localStorage.getItem('token')) {
    const config = {
      headers: { Authorization: 'bearer ' + token }
    };

    let {
      jurisdiction,
      firstName,
      lastName,
      memberID,
      admissionType,
      authRefNo,
      agencyID,
      service,
      ftpFileName,
      updatedFrom,
      updatedTo,
      authBegin,
      authEnd
    } = dataSearch;

    if (typeof updatedFrom === 'string') {
      updatedFrom = new Date(updatedFrom);
    }
    if (typeof updatedTo === 'string') {
      updatedTo = new Date(updatedTo);
    }

    if (typeof authBegin === 'string') {
      authBegin = new Date(authBegin);
    }

    if (typeof authEnd === 'string') {
      authEnd = new Date(authEnd);
    }

    const authorizationSearch = {
      jurisdiction,
      firstName,
      lastName,
      memberID,
      admissionType,
      agencyID,
      service,
      authRefNo,
      ftpFileName,
      updatedFrom: !isNil(updatedFrom) ? getDateJSONLocal(updatedFrom) : null,
      updatedTo: !isNil(updatedTo) ? getDateJSONLocal(updatedTo) : null,
      authBegin: !isNil(authBegin) ? getDateJSONLocal(authBegin) : null,
      authEnd: !isNil(authEnd) ? getDateJSONLocal(authEnd) : null
    };

    return appRequest.post(
      '/Warehouses/search-authorizations',
      {
        connection: connection,
        authorizationSearch: authorizationSearch,
        paging: paging
      },
      config
    );
  }
};
