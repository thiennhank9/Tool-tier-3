import Login from '../modules/login/Login';
import SelectTool from '../modules/select/select_tool/SelectTool';
import SelectConnection from '../modules/select/select_connection/SelectConnection';
import ToolWarehouse from '../modules/tools/tool_Warehouse/ToolWarehouse';
import ToolHHAX from '../modules/tools/tool_HHAX/ToolHHAX';
import ManageConnections from '../modules/manage/manage_connections/ManageConnections';
import ManageUsers from '../modules/manage/manage_users/ManageUsers';

export const paths = {
  LOGIN: '/login',
  SELECT_TOOL: '/select-tool',
  SELECT_CONNECTION: '/select-connection',
  TOOL_1: '/tool-1',
  TOOL_2: '/tool-2',
  MANAGE_CONNECTIONS: '/manage-connections',
  MANAGE_USERS: '/manage-users'
};

export default [
  {
    path: paths.LOGIN,
    component: Login
  },
  {
    path: paths.SELECT_TOOL,
    component: SelectTool,
    withNav: true
  },
  {
    path: paths.SELECT_CONNECTION,
    component: SelectConnection,
    withNav: true
  },
  {
    path: paths.TOOL_1,
    component: ToolWarehouse,
    withNav: true
  },
  {
    path: paths.TOOL_2,
    component: ToolHHAX,
    withNav: true
  },
  {
    path: paths.MANAGE_CONNECTIONS,
    component: ManageConnections,
    withNav: true
  },
  {
    path: paths.MANAGE_USERS,
    component: ManageUsers,
    withNav: true
  }
];
