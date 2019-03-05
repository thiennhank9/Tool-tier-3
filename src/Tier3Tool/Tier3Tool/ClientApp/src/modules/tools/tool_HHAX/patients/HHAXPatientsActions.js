import { compose, withProps } from 'recompose';
import HHAXPatientsStore from 'src/stores/HHAXPatientsStore';

export default compose(
  withProps({
    hhaxPatientsStore: new HHAXPatientsStore()
  })
);
