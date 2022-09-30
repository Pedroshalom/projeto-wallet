import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loginAction } from '../redux/actions';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
  };

  handleClick = (email) => {
    const { takeItEmail, history } = this.props;
    takeItEmail(email);
    history.push('/carteira');
  };

  validating = () => {
    const PASSWORD_MIN_SIZE = 6;
    const { email, password } = this.state;
    const checks = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const validatingEmail = email.match(checks) != null;
    const validatingPassword = password.length >= PASSWORD_MIN_SIZE;
    return validatingEmail && validatingPassword;
  };

  render() {
    const { email, password } = this.state;

    // const login = /\S+[@]\w+[.]\w+/gm;
    // const minLength = 6;
    // const cond = (login.email) && password.length >= minLength);
    return (
      <div className="container">
        Login
        <input
          placeholder="Digite seu email"
          className="login"
          type="email"
          data-testid="email-input"
          value={ email }
          onChange={ ({ target: { value } }) => this.setState({ email: value }) }
        />

        Senha
        <input
          placeholder="Digite sua senha"
          className="senha"
          type="password"
          data-testid="password-input"
          value={ password }
          onChange={ ({ target: { value } }) => this.setState({ password: value }) }
        />

        <button
          className="button"
          type="button"
          disabled={ !this.validating() }
          onClick={ () => this.handleClick(email) }
        >
          Entrar
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  takeItEmail: (email) => dispatch(loginAction(email)),
});

Login.propTypes = {
  takeItEmail: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
