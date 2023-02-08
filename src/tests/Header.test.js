import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';
import mockData from './helpers/mockData';

const initialState = {
  user: {
    email: 'tryber@test.com',
    password: '123456',
  },
};

const initialEntries = ['/carteira'];

describe('Check Header', () => {
  it('Check title "My Wallet" is redered', () => {
    renderWithRouterAndRedux(<App />, { initialState, initialEntries });

    const titleHeader = screen.getByRole('heading', { level: 1, name: /my wallet/i });
    expect(titleHeader).toBeInTheDocument();
  });

  it('Check if total expense starts with zero', () => {
    renderWithRouterAndRedux(<App />, { initialState, initialEntries });
    const initialExpense = screen.getByTestId('total-field');
    expect(initialExpense).toHaveTextContent('0.00');
  });

  it('verify if "despesas" is updated when a new expense was added', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData) });

    const descriptionData = 'description-input';
    const valueData = 'value-input';

    const descriptionInput = await screen.findByTestId(descriptionData);
    const valueInput = await screen.findByTestId(valueData);

    const includeButton = await screen.findByRole('button');

    userEvent.type(descriptionInput, 'Test');
    userEvent.type(valueInput, '12');

    act(() => {
      userEvent.click(includeButton);
    });

    await waitFor(() => {
      const expensesField = screen.findByTestId('total-field');
      expect(expensesField.value).not.toBe('0');
    });
  });
});
