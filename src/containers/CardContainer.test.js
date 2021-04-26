import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../app/store';
import CardContainer from './CardContainer';

test('renders learn react link', () => {
  const { getByText } = render(
    <Provider store={store}>
      <CardContainer />
    </Provider>
  );
  expect(getByText(/Please wait/i)).toBeInTheDocument();
});
