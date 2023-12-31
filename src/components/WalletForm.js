import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getFetchCurrencies, expensesIncluded } from '../redux/actions';

class WalletForm extends Component {
  state = {
    id: 0,
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
    // expenses: [],
  };

  async componentDidMount() {
    const { dispatch } = this.props;
    await dispatch(getFetchCurrencies());
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  handleButton = async () => {
    const { dispatch } = this.props;
    const url = 'https://economia.awesomeapi.com.br/json/all';
    const response = await fetch(url);
    const data = await response.json();
    delete data.USDT;///
    const { id } = this.state;
    this.setState({
      exchangeRates: data,
    }, async () => {
      await dispatch(expensesIncluded(this.state));
      this.setState({
        id: id + 1,
        value: '',
        description: '',
        currency: 'USD',
        method: 'Dinheiro',
        tag: 'Alimentação',
      });
    });
  };

  render() {
    const { currencies } = this.props;
    const { value, description, currency, tag, method } = this.state;
    return (
      <div>
        <h1>WalletForm</h1>
        <form>
          <label htmlFor="value-input">
            Despesa:
            <input
              type="text"
              name="value"
              value={ value }
              required
              data-testid="value-input"
              onChange={ this.handleChange }
            />
          </label>

          <label htmlFor="description-input">
            Descrição:
            <input
              type="text"
              name="description"
              value={ description }
              required
              data-testid="description-input"
              onChange={ this.handleChange }
            />
          </label>

          <label htmlFor="currency-input">
            Moedas:
            <select
              name="currency"
              value={ currency }
              data-testid="currency-input"
              onChange={ this.handleChange }
            >
              {currencies
                .map((element) => (
                  <option
                    key={ element }
                    value={ element }
                  >
                    {element}
                  </option>
                ))}
            </select>

          </label>
          <select
            data-testid="method-input"
            value={ method }
            name="method"
            onChange={ this.handleChange }
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>

          <select
            data-testid="tag-input"
            value={ tag }
            name="tag"
            onChange={ this.handleChange }
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </form>
        <button
          type="button"
          onClick={ this.handleButton }
        >
          Adicionar despesa
        </button>
      </div>
    );
  }
}

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const mapStateToProps = (globalState) => ({
  currencies: globalState.wallet.currencies,
});

export default connect(mapStateToProps)(WalletForm);
