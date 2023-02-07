// ACTION TYPE
export const EMAIL_SAVED = 'EMAIL_SAVED';
export const CURRENCIES = 'CURRENCIES';
export const EXPENSES_INCLUDED = 'EXPENSES_INCLUDED';
export const EXPENSES_EXCLUDED = 'EXPENSES_EXCLUDED';

// ACTION CREATOR
export const saveEmail = (email) => ({
  type: EMAIL_SAVED,
  payload: email,
});

const url = 'https://economia.awesomeapi.com.br/json/all';

export const currenciesType = (payload) => ({
  type: CURRENCIES,
  payload,
});

export const expensesIncluded = (payload) => ({
  type: EXPENSES_INCLUDED,
  payload,
});

export const expensesExcluded = (payload) => ({
  type: EXPENSES_EXCLUDED,
  payload,
});

export const getFetchCurrencies = () => async (dispatch) => {
  const response = await fetch(url);
  const data = await response.json();
  return dispatch(currenciesType(data));
};
