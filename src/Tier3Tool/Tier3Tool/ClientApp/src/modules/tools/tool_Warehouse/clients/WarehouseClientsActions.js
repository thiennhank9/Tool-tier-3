import { compose, withProps } from 'recompose';
import WarehouseClientStore from 'src/stores/WarehouseClientStore';

export default compose(
  withProps({
    warehouseClientStore: new WarehouseClientStore()
  })
);
