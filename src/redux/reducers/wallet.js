// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { MOEDA, SAVE } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case MOEDA:
    return { ...state, currencies: action.payload };
  case SAVE:
    return { ...state,
      expenses: [...state.expenses,
        {
          id: state.expenses.length,
          ...action.payload,
        }],
    };
  default:
    return state;
  }
};

export default wallet;
