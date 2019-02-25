import { compose, withProps } from 'recompose';
import WarehouseAuthorizationsStore from 'src/stores/WarehouseAuthorizationsStore';

export default compose(
  withProps({
    warehouseAuthorizationsStore: new WarehouseAuthorizationsStore()
  })
);
