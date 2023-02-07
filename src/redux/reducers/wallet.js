import { CURRENCIES, EXPENSES_INCLUDED, EXPENSES_EXCLUDED } from '../actions';

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
  case EXPENSES_EXCLUDED:
    return {
      ...state,
      expenses: action.payload,
    };
  default:
    return state;
  }
};

export default handleWallet;
