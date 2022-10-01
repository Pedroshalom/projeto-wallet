// Coloque aqui suas actions
// Coloque aqui suas actions
export const LOGIN = 'LOGIN';
export const MOEDA = 'MOEDA';

export const loginAction = (email) => ({
  type: LOGIN,
  payload: email,
});

const actionMoeda = (moeda) => ({
  type: MOEDA,
  payload: Object.keys(moeda).filter((e) => e !== 'USDT'),
});

export const fetchApi = () => async (dispatch) => {
  try {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await response.json();
    // const moeda = await response.json();
    // console.log(moeda);
    // const moedaFilter = Object.keys(moeda).filter((currencie) => currencie !== 'USDT');
    dispatch(actionMoeda(data));
  } catch (e) {
    return console.log(e);
  }
};
