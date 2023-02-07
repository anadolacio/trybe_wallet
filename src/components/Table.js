import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { expensesExcluded } from '../redux/actions';

class Table extends Component {
  handleExpensesDeleted = (id) => {
    console.log(id);
    const { dispatch, expenses } = this.props;
    const deletedData = expenses.filter((expense) => expense.id !== id);
    dispatch(expensesExcluded(deletedData));
  };

  render() {
    const { expenses } = this.props;
    return (
      <div>
        <h2>Table</h2>
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
            { expenses.map((expense) => (
              <tr key={ expense.id }>
                <td>{ expense.description }</td>
                <td>{ expense.tag }</td>
                <td>{ expense.method }</td>
                <td>{ Number(expense.value).toFixed(2) }</td>
                <td>{ expense.exchangeRates[expense.currency].name }</td>
                <td>
                  { Number(expense.exchangeRates[expense.currency].ask)
                    .toFixed(2) }

                </td>
                <td>
                  { Number((expense.value)
                * (expense.exchangeRates[expense.currency].ask)).toFixed(2) }

                </td>
                <td>Real</td>
                <td>
                  <button
                    data-testid="delete-btn"
                    type="button"
                    onClick={ () => this.handleExpensesDeleted(expense.id) }
                  >
                    Excluir
                  </button>

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (globalState) => ({
  expenses: globalState.wallet.expenses,
});

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(Table);
