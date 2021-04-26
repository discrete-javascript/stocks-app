import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import { store } from '../app/store';
import BottomContainer from '../containers/ChartContainer';

// Snapshot testing
it('renders correctly', () => {
  const tree = renderer
    .create(
      <Provider store={store}>
        <BottomContainer />
      </Provider>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
