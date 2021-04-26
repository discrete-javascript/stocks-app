import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../app/store';
import TopContainer from './TopContainer';

test('renders learn react link', () => {
  const { getByText } = render(
    <Provider store={store}>
      <TopContainer />
    </Provider>
  );
  expect(getByText(/Please wait/i)).toBeInTheDocument();
});