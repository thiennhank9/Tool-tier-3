import { compose, withProps } from 'recompose';
import HHAXAuthorizationsStore from 'src/stores/HHAXAuthorizationsStore';

export default compose(
  withProps({
    hhaxAuthorizationsStore: new HHAXAuthorizationsStore()
  })
);
