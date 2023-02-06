// ACTION TYPE
export const EMAIL_SAVED = 'EMAIL_SAVED';
export const CURRENCIES = 'CURRENCIES';

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

export const getFetchCurrencies = () => async (dispatch) => {
  const response = await fetch(url);
  const data = await response.json();
  return dispatch(currenciesType(data));
};
