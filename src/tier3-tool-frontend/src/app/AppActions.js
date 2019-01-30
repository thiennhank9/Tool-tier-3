import { withProps } from 'recompose';

import GlobalStore from '../stores/GlobalStore';

export default withProps({
  globalStore: new GlobalStore()
});
