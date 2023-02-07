import { CURRENCIES, EXPENSES_INCLUDED } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  id: 0,
};

const handleWallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case CURRENCIES:
    delete action.payload.USDT;
    return {
      ...state,
      currencies: Object.keys(action.payload),
    };
  case EXPENSES_INCLUDED:
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
      id: state.id + 1,
    };
  default:
    return state;
  }
};

export default handleWallet;
