import { compose, withProps } from 'recompose';
import ManageUsersStore from 'src/stores/ManageUsersStore';

// const manageUsersStore = new ManageUsersStore()
export default compose(
  withProps({
    manageUsersStore: new ManageUsersStore()
  })
);
