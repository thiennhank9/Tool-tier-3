import { compose, withProps, withHandlers } from 'recompose';

export default compose(
    withProps({
      user: {}
    }),
    withHandlers({
      onClickChangeConnection: props => event => {
      }
    })
  );