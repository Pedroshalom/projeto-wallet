import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleta } from '../redux/actions/index';

class Table extends Component {
  calculeValueOne = (ask) => {
    const answer = Number(ask);
    return Number(answer).toFixed(2);
  };

  calculeValoueTwo = (value, ask) => {
    const answer = Number(ask) * Number(value);
    return Number(answer).toFixed(2);
  };

  deletaTudo = (event, id) => {
    event.preventDefault();
    const { dispatch, expenses } = this.props;
    const deleteExpense = expenses.filter((e) => e.id !== id);
    dispatch(deleta(deleteExpense));
  };

  render() {
    const { expenses } = this.props;
    return (
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          {
            expenses.map((event) => (
              <tr key={ event.id }>
                <td>{event.description}</td>
                <td>{event.tag}</td>
                <td>{event.method}</td>
                <td>{Number(event.value).toFixed(2)}</td>
                <td>{event.exchangeRates[event.currency].name}</td>
                <td>{this.calculeValueOne(event.exchangeRates[event.currency].ask)}</td>
                <td>
                  {this.calculeValoueTwo(event.value, event.exchangeRates[event.currency]
                    .ask)}
                </td>
                <td>Real</td>
                <td>
                  <button
                    type="button"
                    data-testid="delete-btn"
                    onClick={ (e) => this.deletaTudo(e, event.id) }
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = ({ wallet }) => ({
  expenses: wallet.expenses,
});

Table.propTypes = {
  expenses: PropTypes.instanceOf(Array).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(Table);
