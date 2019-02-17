import { compose, withProps, withHandlers } from 'recompose';
import ConnectionStore from 'src/stores/ConnectionStore';
import { paths } from 'src/data/RoutesData';

export default compose(
  withProps({
    connectionStore: new ConnectionStore()
  }),
  withHandlers({
    getConnections: props => event => {
      props.connectionStore.getConnections();
    },
    handleClickConnect: props => event => {
      props.history.push({
        pathname: paths.TOOL_1,
        state: { selectedConnection: props.connectionStore.selectedConnection }
      });
    }
  })
);
