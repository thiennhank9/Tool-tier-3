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
      props.userStore.toggleIsRemembered();
    },
    handleLogin: props => event => {
      event.preventDefault();
      props.globalStore.setIsTimeOut(false);
      props.userStore
        .callAuthenticate()
        .then(() => {
          if (props.userStore.status === 200) {
            localStorage.setItem('username', props.userStore.username);
            localStorage.setItem('password', props.userStore.password);

            props.globalStore.getResultsFromUserStore(props.userStore);

            props.globalStore.setLogin();
            localStorage.setItem('isRemembered', JSON.stringify(props.userStore.isRemembered));

            props.globalStore.setToLocalStorage();
            props.history.push(paths.SELECT_TOOL);
          }
        })
        .catch(error => console.log(error));
    }
  })
);
