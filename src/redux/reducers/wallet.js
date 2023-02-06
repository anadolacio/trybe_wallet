import { CURRENCIES } from '../actions';

const INITIAL_STATE = {
  currencies: [],
};

const handleWallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case CURRENCIES:
    delete action.payload.USDT;
    return {
      ...state,
      currencies: Object.keys(action.payload),
    };
  default:
    return state;
  }
};

export default handleWallet;
