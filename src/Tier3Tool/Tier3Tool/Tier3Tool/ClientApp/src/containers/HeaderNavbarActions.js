import { compose, withProps, withHandlers } from 'recompose';
import { paths } from 'src/data/RoutesData';
import TOOL_TYPES from 'src/constants/ToolTypes.js';

export default compose(
  withProps({
    user: {}
  }),
  withHandlers({
    onClickTool1: props => event => {
      props.history.push({
        pathname: paths.SELECT_CONNECTION,
        state: { typeName: TOOL_TYPES.WAREHOUSE },
      });
    },
    onClickTool2: props => event => {
      props.history.push({
        pathname: paths.SELECT_CONNECTION,
        state: { typeName: TOOL_TYPES.HHAX },
      });
    },
    onClickManageUsers: props => event => {
      props.history.push(paths.MANAGE_USERS);
    },
    onClickManageConnections: props => event => {
      props.history.push(paths.MANAGE_CONNECTIONS);
    },
    onClickLogout: props => event => {
      localStorage.removeItem('token', '');
      localStorage.removeItem('role', '');
      localStorage.removeItem('canAccessDW', '');
      localStorage.removeItem('canAccessHHAX', '');
      props.globalStore.setLogout(false);
      props.history.push('/login');
    }
  })
);
