import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';

const emailField = 'email-input';
const passwordField = 'password-input';

const emailTest = 'tryber@test.com.br';
const passwordTest = '123';

describe('Check App', () => {
  it('Check if APP is redered', () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/'] });
  });

  it('Check if a title Login is rendered', () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/'] });

    const loginTitle = screen.getByRole('heading', { name: /login/i });
    expect(loginTitle).toBeInTheDocument();
  });

  it('Check if a email and password text is rendered', () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/'] });

    const emailText = screen.getByTestId(emailField);
    const passwordText = screen.getByTestId(passwordField);
    expect(emailText).toBeInTheDocument();
    expect(passwordText).toBeInTheDocument();
  });

  it('Check if a email and password is validated', () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/'] });

    const emailText = screen.getByTestId(emailField);
    const passwordText = screen.getByTestId(passwordField);
    const loginButton = screen.getByText(/entrar/i);

    userEvent.type(emailText, emailTest);
    userEvent.type(passwordText, passwordTest);
    userEvent.click(loginButton);
    expect(loginButton).toBeDisabled();
  });

  it('Check if the button is enable', () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/'] });

    const emailText = screen.getByTestId(emailField);
    const passwordText = screen.getByTestId(passwordField);
    const loginButton = screen.getByText(/entrar/i);

    userEvent.type(emailText, 'tryber');
    userEvent.type(passwordText, '123456');
    userEvent.click(loginButton);
    expect(loginButton).toBeDisabled();
  });
});
