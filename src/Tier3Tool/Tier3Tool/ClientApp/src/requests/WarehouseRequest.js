import appRequest from './AppRequest';
import { isNil } from 'lodash';

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
      updatedFrom: !isNil(updatedFrom) ? updatedFrom.toJSON() : null,
      updatedTo: !isNil(updatedTo) ? updatedTo.toJSON() : null,
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
      updatedFrom: !isNil(updatedFrom) ? updatedFrom.toJSON() : null,
      updatedTo: !isNil(updatedTo) ? updatedTo.toJSON() : null,
      authBegin: !isNil(authBegin) ? authBegin.toJSON() : null,
      authEnd: !isNil(authEnd) ? authEnd.toJSON() : null
    };

    return appRequest.post('/Warehouses/search-authorizations', {
      connection: connection,
      authorizationSearch: authorizationSearch,
      paging: paging
    }, config);
  }
};
