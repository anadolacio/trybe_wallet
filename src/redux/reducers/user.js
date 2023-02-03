import { EMAIL_SAVED } from '../actions/index';

const INITIAL_STATE = {
  email: '',
};

const emailReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case EMAIL_SAVED:
    return {
      ...state,
      email: action.payload,
    };
  default:
    return state;
  }
};

export default emailReducer;
