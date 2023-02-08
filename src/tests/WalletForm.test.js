import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';

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

    const titleWallet = screen.getByRole('heading', { level: 1, name: /walletform/i });
    expect(titleWallet).toBeInTheDocument();
  });

  it('Check title "My Wallet" is redered', () => {
    renderWithRouterAndRedux(<App />, { initialState, initialEntries });

    const descriptionField = screen.getByTestId('description-input');
    const buttonAddExpense = screen.getByRole('button');

    const teste = 'compra';
    userEvent.type(descriptionField, teste);
    userEvent.click(buttonAddExpense);
  });
});
