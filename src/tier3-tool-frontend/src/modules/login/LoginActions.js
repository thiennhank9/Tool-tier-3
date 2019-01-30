import { compose, withProps, withHandlers } from 'recompose';
import { paths } from 'src/data/RoutesData';

export default compose(
  withProps({
    user: {}
  }),
  withHandlers({
    onClickLogin: props => event => {
      props.globalStore.setLogin();
      props.history.push(paths.SELECT_TOOL);
    }
  })
);
