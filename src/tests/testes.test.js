import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';

describe('Testando a aplicação do projeto', () => {
  test('Testando se Quando inicia a aplicação a tela inicial é renderizada', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const { pathname } = history.location;
    const inputEmail = screen.getByTestId('email-input');
    const password = screen.getByTestId('password-input');
    const button = screen.getByRole('button', {
      name: /entrar/i,
    });

    expect(inputEmail).toBeInTheDocument();
    expect(password).toBeInTheDocument();
    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();

    userEvent.type(inputEmail, 'email@email.com');
    userEvent.type(password, '111111');

    expect(button).toBeEnabled();

    userEvent.click(button);

    expect(pathname).toBe('/');
  });

  test('Testando a rota carteira', () => {
    const { history } = renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });
    const { pathname } = history.location;
    const emailField = screen.getByTestId('email-field');
    const totalField = screen.getByTestId('total-field');
    const currField = screen.getByTestId('header-currency-field');
    const valueField = screen.getByTestId('value-input');
    const descriptionField = screen.getByTestId('description-input');
    const button = screen.getByRole('button', {
      name: /adicionar despesa/i,
    });
    expect(emailField).toBeInTheDocument();
    expect(totalField).toBeInTheDocument();
    expect(currField).toBeInTheDocument();
    expect(valueField).toBeInTheDocument();
    expect(descriptionField).toBeInTheDocument();
    expect(button).toBeInTheDocument();

    userEvent.click(button);

    expect(pathname).toBe('/carteira');
  });
});
