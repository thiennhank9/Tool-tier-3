import appRequest from './AppRequest';
import { merge } from 'lodash';

export default {
  getJurisdiction(connection) {
    return appRequest.post('/Warehouses/get-jurisdictions', { ...connection });
  },
  searchWarehouseClients(connection, dataSearch) {
    const { updatedFrom, updatedTo } = dataSearch;
    const clientSearch = merge(dataSearch, { updatedFrom: updatedFrom.toJSON(), updatedTo: updatedTo.toJSON() });
    return appRequest.post('/Warehouses/search-clients', { connection: connection, clientSearch: clientSearch });
  }
};
