import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchApi, actionExpense } from '../redux/actions';

class WalletForm extends Component {
  state = {
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
    exchangeRates: [],
  };

  componentDidMount() {
    const { fetchCoins } = this.props;
    fetchCoins();
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  handleClick = async (e) => {
    e.preventDefault();
    const { actionExpenseDispatch } = this.props;
    const endpoint = 'https://economia.awesomeapi.com.br/json/all';
    const data = await fetch(endpoint);
    const moedas = await data.json();
    // console.log(moedas);
    this.setState({
      exchangeRates: moedas,
    }, () => {
      actionExpenseDispatch(this.state);
      this.setState({
        value: '',
        description: '',
        currency: 'USD',
        method: 'Dinheiro',
        tag: 'Alimentação',
      });
    });
  };

  render() {
    const { description, value, currency, method, tag } = this.state;
    const { currencies } = this.props;
    // console.log(currencies);
    return (
      <div className="containerInputs">

        <input
          className="despesa"
          placeholder="Adicione da sua despesa"
          type="text"
          data-testid="description-input"
          value={ description }
          name="description"
          onChange={ this.handleChange }
        />

        <input
          placeholder="Valor da sua despesa"
          type="text"
          data-testid="value-input"
          value={ value }
          name="value"
          onChange={ this.handleChange }
        />
        <select
          data-testid="currency-input"
          value={ currency }
          name="currency"
          onChange={ this.handleChange }
        >
          {
            currencies.map((event, index) => <option key={ index }>{event}</option>)
          }
        </select>

        <select
          data-testid="method-input"
          value={ method }
          name="method"
          onChange={ this.handleChange }
        >
          <option
            value="Dinheiro"
          >
            Dinheiro

          </option>
          <option
            value="Cartão de crédito"
          >
            Cartão de crédito

          </option>
          <option
            value="Cartão de débito"
          >
            Cartão de débito

          </option>
        </select>

        <select
          data-testid="tag-input"
          value={ tag }
          name="tag"
          onChange={ this.handleChange }
        >
          <option
            value="Alimentação"
          >
            Alimentação

          </option>
          <option
            value="Lazer"
          >
            Lazer

          </option>
          <option
            value="Trabalho"
          >
            Trabalho

          </option>
          <option
            value="Transporte"
          >
            Transporte

          </option>
          <option
            value="Saúde"
          >
            Saúde

          </option>
        </select>
        <button
          type="button"
          onClick={ this.handleClick }
        >
          Adicionar despesa
        </button>
      </div>
    );
  }
}

const mapStateToProps = ({ wallet }) => ({
  currencies: wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCoins: () => dispatch(fetchApi()),
  actionExpenseDispatch: (state) => dispatch(actionExpense(state)),
});

WalletForm.propTypes = {
  currencies: PropTypes.instanceOf(Array).isRequired,
  fetchCoins: PropTypes.func.isRequired,
  actionExpenseDispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
