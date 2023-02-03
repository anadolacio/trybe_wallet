// ACTION TYPE
export const EMAIL_SAVED = 'EMAIL_SAVED';

// ACTION CREATOR
export const saveEmail = (email) => ({
  type: EMAIL_SAVED,
  payload: email,
});
