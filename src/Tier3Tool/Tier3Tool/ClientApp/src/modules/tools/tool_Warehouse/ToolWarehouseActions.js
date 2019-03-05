import { compose, withHandlers } from 'recompose';
import { paths } from 'src/data/RoutesData';

export default compose(
  withHandlers({
    onClickChangeConnection: props => event => {
      props.history.push({
        pathname: paths.SELECT_CONNECTION_WAREHOUSE,
        state: { typeName: 'Warehouse' }
      });
    }
  })
);
