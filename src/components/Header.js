import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  updatingExpenses = () => {
    const { expenses } = this.props;
    if (expenses.length > 0) {
      return expenses.reduce((acc, { value, currency, exchangeRates }) => {
        const total = Number(value) * Number(exchangeRates[currency].ask);
        // console.log(total);
        return total + acc;
      }, 0);
    }
  };

  render() {
    const { email } = this.props;
    return (
      <header>
        <h1> My Wallet </h1>
        <h3 data-testid="email-field">{ email }</h3>
        <p> Despesa total: </p>
        <h5 data-testid="total-field">
          { this.updatingExpenses() ? this.updatingExpenses().toFixed(2) : '0,00' }
        </h5>
        <h6 data-testid="header-currency-field">BRL</h6>

      </header>
    );
  }
}
const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string.isRequired,
    currency: PropTypes.string.isRequired,
    method: PropTypes.string.isRequired,
    tag: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  })).isRequired,
};

export default connect(mapStateToProps)(Header);
