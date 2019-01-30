import { compose, withProps, withHandlers } from 'recompose';
import { paths } from 'src/data/RoutesData';

export default compose(
  withProps({
    user: {}
  }),
  withHandlers({
    onClickTool1: props => event => {
      props.history.push(paths.TOOL_1)
    },
    onClickTool2: props => event => {
      props.history.push(paths.TOOL_2)
    },
    onClickManageUsers: props => event => {
      props.history.push(paths.MANAGE_USERS)
    },
    onClickManageConnections: props => event => {
      props.history.push(paths.MANAGE_CONNECTIONS)
    }
  })
);
