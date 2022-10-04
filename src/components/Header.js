import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  calculatorTotalValue = () => {
    const { expenses } = this.props;
    if (expenses.length > 0) {
      const sum = expenses.reduce((acc, cur) => {
        const exchangeValue = cur.currency;
        const askValue = cur.exchangeRates[exchangeValue].ask;
        const value = Number(askValue) * Number(cur.value);
        return acc + Number(value);
      }, 0);
      return Number(sum).toFixed(2);
    }
    return 0;
  };

  render() {
    const { email } = this.props;
    const expenses = this.calculatorTotalValue();
    return (
      <div className="wallet">
        <p className="email" data-testid="email-field">{ email }</p>
        <div>
          <p>
            <span data-testid="total-field">{expenses}</span>
          </p>
          <p data-testid="header-currency-field">BRL</p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ user, wallet }) => ({
  email: user.email,
  expenses: wallet.expenses,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.instanceOf(Array).isRequired,
};

export default connect(mapStateToProps)(Header);
