import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchApi } from '../redux/actions';

class WalletForm extends Component {
  state = {
    expense: '',
    descriptionExpense: '',
    currency: 'USD',
    payment: 'Dinheiro',
    tagExpense: 'Alimentação',
  };

  componentDidMount() {
    const { fetchCoins } = this.props;
    fetchCoins();
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  render() {
    const { descriptionExpense, expense, currency, payment, tagExpense } = this.state;
    const { currencies } = this.props;
    console.log(currencies);
    return (
      <div>
        <input
          placeholder="Adicione sua despesa"
          type="number"
          data-testid="value-input"
          value={ expense }
          name="expense"
          onChange={ (event) => this.handleChange(event) }
        />

        <input
          type="text"
          data-testid="description-input"
          value={ descriptionExpense }
          name="descriptionExpense"
          onChange={ (event) => this.handleChange(event) }
        />

        <select
          data-testid="currency-input"
          value={ currency }
          name="currency"
          onChange={ (event) => this.handleChange(event) }
        >
          {
            currencies.map((event, index) => <option key={ index }>{event}</option>)
          }
        </select>

        <select
          data-testid="method-input"
          value={ payment }
          name="payment"
          onChange={ (event) => this.handleChange(event) }
        >
          <option>Dinheiro</option>
          <option>Cartão de crédito</option>
          <option>Cartão de débito</option>
        </select>

        <select
          data-testid="tag-input"
          value={ tagExpense }
          name="tagExpense"
          onChange={ (event) => this.handleChange(event) }
        >
          <option>Alimentação</option>
          <option>Lazer</option>
          <option>Trabalho</option>
          <option>Transporte</option>
          <option>Saúde</option>
        </select>
      </div>
    );
  }
}

const mapStateToProps = ({ wallet }) => ({
  currencies: wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCoins: () => dispatch(fetchApi()),
});

WalletForm.propTypes = {
  currencies: PropTypes.instanceOf(Array).isRequired,
  fetchCoins: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
