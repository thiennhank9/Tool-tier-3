import { compose, withProps, withHandlers } from 'recompose';
import ConnectionStore from 'src/stores/ConnectionStore';

export default compose(
  withProps({
    connectionStore: new ConnectionStore()
  }),
  withHandlers({
    getConnections: props => event => {
      props.connectionStore.getConnections();
    }
  })
);
