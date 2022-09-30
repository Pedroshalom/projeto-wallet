import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { email } = this.props;
    // const despesas = 0;
    return (
      <div className="wallet">
        <p className="email" data-testid="email-field">{ email }</p>
        <p>
          {'Despesas totais: '}
          <span data-testid="total-field">0</span>
        </p>
        <p data-testid="header-currency-field">BRL</p>
      </div>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  email: user.email,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Header);
