import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { email } = this.props;
    return (
      <header>
        <h1> My Wallet </h1>
        <h3 data-testid="email-field">{ email }</h3>
        <h5 data-testid="total-field">Despesa total: 0 </h5>
        <h6 data-testid="header-currency-field">BRL</h6>

      </header>
    );
  }
}
const mapStateToProps = (state) => ({
  email: state.user.email,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Header);
