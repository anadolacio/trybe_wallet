import { React, Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { saveEmail } from '../redux/actions';

class Login extends Component {
  state = {
    email: '',
    password: '',
    disabledButton: true,
  };

  handleCharacteres = ({ target }) => {
    const { name, value } = target;
    // console.log({ [name]: value });
    this.setState({
      [name]: value,
    }, this.loginValidation);
  };

  handleSubmit = () => {
    const { dispatch, history } = this.props;
    const { email } = this.state;
    dispatch(saveEmail(email));
    history.push('/carteira');
  };

  loginValidation = () => {
    const { email, password } = this.state;
    const maxLength = 5;
    const emailValidated = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email);
    if (password.length > maxLength
        && emailValidated) {
      this.setState({
        disabledButton: false,
      });
    } else {
      this.setState({
        disabledButton: true,
      });
    }
  };

  render() {
    const { email, password, disabledButton } = this.state;
    return (
      <div>
        <h1>Login</h1>
        <section>
          <label htmlFor="email-input">
            Email:
            <input
              type="email"
              name="email"
              value={ email }
              required
              data-testid="email-input"
              onChange={ this.handleCharacteres }
            />
          </label>

          <label htmlFor="password-input">
            Senha:
            <input
              type="text"
              name="password"
              value={ password }
              required
              data-testid="password-input"
              onChange={ this.handleCharacteres }
            />
          </label>

        </section>

        <button
          type="button"
          disabled={ disabledButton }
          onClick={ this.handleSubmit }
        >
          Entrar
        </button>
      </div>
    );
  }
}

const mapStateToProps = (globalstate) => ({
  email: globalstate.user.email,
});

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
  // email: PropTypes.string.isRequired,
  // password: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Login);
