import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../app/store';
import SearchContainer from '../containers/SearchContainer';

test('renders please wait', () => {
  const { getByText } = render(
    <Provider store={store}>
      <SearchContainer />
    </Provider>
  );
  expect(getByText(/Please wait/i)).toBeInTheDocument();
});
