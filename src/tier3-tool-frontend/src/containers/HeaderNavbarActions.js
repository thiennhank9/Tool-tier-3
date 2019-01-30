import { compose, withProps, withHandlers } from 'recompose';

export default compose(
  withProps({
    user: {}
  }),
  withHandlers({
    onClickLogout: props => event => {
      props.globalStore.setLogout();
      props.history.push('/login');
    }
  })
);
