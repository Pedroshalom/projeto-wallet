// Coloque aqui suas actions
export const LOGIN = 'LOGIN';
export const MOEDA = 'MOEDA';
export const SAVE = 'SAVE';
const endpoint = 'https://economia.awesomeapi.com.br/json/all';

export const loginAction = (email) => ({
  type: LOGIN,
  payload: email,
});

const actionMoeda = (moeda) => ({
  type: MOEDA,
  payload: Object.keys(moeda).filter((e) => e !== 'USDT'),
});

export const actionExpense = (payload) => ({
  type: SAVE,
  payload,
});

export const fetchApi = () => async (dispatch) => {
  try {
    const response = await fetch(endpoint);
    const data = await response.json();
    // console.log(data);
    dispatch(actionMoeda(data));
  } catch (e) {
    return console.log(e);
  }
};

export const addExpense = (obj) => async (dispatch) => {
  try {
    dispatch(actionExpense(obj));
  } catch (e) {
    return console.log(e);
  }
};
