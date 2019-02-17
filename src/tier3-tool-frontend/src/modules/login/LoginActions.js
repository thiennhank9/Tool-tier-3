import { compose, withProps, withHandlers } from 'recompose';
import { paths } from 'src/data/RoutesData';
import UserStore from 'src/stores/UserStore';

export default compose(
  withProps({
    userStore: new UserStore()
  }),
  withHandlers({
    handleChangeUsername: props => event => {
      props.userStore.setUsername(event.target.value);
    },
    handleChangePassword: props => event => {
      props.userStore.setPassword(event.target.value);
    },
    handleToggleRemember: props => event => {
      props.userStore.toggleIsRemembered(event.target.value);
    },
    handleLogin: props => event => {
      props.userStore.callAuthenticate().then(() => {
        if (props.userStore.status === 200) {
          props.globalStore.getResultsFromUserStore(props.userStore);
          props.globalStore.setLogin();
          localStorage.setItem('globalStorage', JSON.stringify(props.globalStore));
          props.history.push(paths.SELECT_TOOL);
          // props.history.push({
          //   pathname: paths.SELECT_TOOL,
          //   state: { globalStore: props.globalStore }
          // });
        }
      });
    }
  })
);
