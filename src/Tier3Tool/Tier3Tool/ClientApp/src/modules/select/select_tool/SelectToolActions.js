import { compose, withHandlers } from 'recompose';
import { paths } from 'src/data/RoutesData';
import TOOL_TYPES from 'src/constants/ToolTypes.js';

export default compose(
  withHandlers({
    onClickTool1: props => event => {
      props.history.push({
        pathname: paths.SELECT_CONNECTION_WAREHOUSE,
        state: { typeName: TOOL_TYPES.WAREHOUSE },
      });
    },
    onClickTool2: props => event => {
      props.history.push({
        pathname: paths.SELECT_CONNECTION_HHAX,
        state: { typeName: TOOL_TYPES.HHAX },
      });
    },
    onClickManageUsers: props => event => {
      props.history.push(paths.MANAGE_USERS)
    },
    onClickManageConnections: props => event => {
      props.history.push(paths.MANAGE_CONNECTIONS)
    }
  })
);
