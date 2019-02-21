import appRequest from './AppRequest';
import { isNil, merge } from 'lodash';

export default {
  getJurisdiction(connection) {
    return appRequest.post('/Warehouses/get-jurisdictions', { ...connection });
  },
  searchWarehouseClients(connection, dataSearch) {
    let { updatedFrom, updatedTo } = dataSearch;

    if (typeof updatedFrom === 'string') {
      updatedFrom = new Date(updatedFrom);
    }
    if (typeof updatedTo === 'string') {
      updatedTo = new Date(updatedTo);
    }

    const clientSearch = merge(dataSearch, {
      updatedFrom: !isNil(updatedFrom) ? updatedFrom.toJSON() : null,
      updatedTo: !isNil(updatedTo) ? updatedTo.toJSON() : null
    });
    return appRequest.post('/Warehouses/search-clients', { connection: connection, clientSearch: clientSearch });
  },
  searchWarehouseAuthorizations(connection, dataSearch) {
    let { updatedFrom, updatedTo, authBegin, authEnd } = dataSearch;

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

    const authorizationSearch = merge(dataSearch, {
      updatedFrom: !isNil(updatedFrom) ? updatedFrom.toJSON() : null,
      updatedTo: !isNil(updatedTo) ? updatedTo.toJSON() : null,
      authBegin: !isNil(authBegin) ? authBegin.toJSON() : null,
      authEnd: !isNil(authEnd) ? authEnd.toJSON() : null
    });

    return appRequest.post('/Warehouses/search-authorizations', {
      connection: connection,
      authorizationSearch: authorizationSearch
    });
  }
};
