import { compose, withProps, withHandlers } from 'recompose';
import { paths } from 'src/data/RoutesData';

export default compose(
  withProps({
    user: {}
  }),
  withHandlers({
    onClickChangeConnection: props => event => {
      props.history.push({
        pathname: paths.SELECT_CONNECTION,
        state: { typeName: 'Warehouse' },
      });
    }
  })
);
