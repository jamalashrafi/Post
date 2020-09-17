import axios from 'axios';
import {
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
  LOGOUT_USER_REQUEST,
  LOGOUT_USER_SUCCESS,
  LOGOUT_USER_ERROR,
} from '../constants/UserConstants';
import history from '../util/history.js';

export const loginUser = (loginReqObj, callback) => async (dispatch) => {
  dispatch({ type: LOGIN_USER_REQUEST });

  try {
    const { data } = await axios.post(
      `http://localhost:5000/login`,
      loginReqObj
    );
    dispatch({ type: LOGIN_USER_SUCCESS, payload: data.user });
    localStorage.setItem('token', data.token);
    callback();
  } catch (error) {
    dispatch({ type: LOGIN_USER_ERROR, payload: error });
  }
};

export const registerUser = (registerReqObj) => async (dispatch) => {
  dispatch({ type: REGISTER_USER_REQUEST });

  try {
    const { data } = await axios.post(
      `http://localhost:5000/register`,
      registerReqObj
    );
    dispatch({ type: REGISTER_USER_SUCCESS, payload: data.user });
    localStorage.setItem('token', data.token);
  } catch (error) {
    dispatch({ type: REGISTER_USER_ERROR, payload: error });
  }
};

export const logout = () => async (dispatch) => {
  dispatch({ type: LOGOUT_USER_REQUEST });

  try {
    const { data } = await axios.post(`http://localhost:5000/logout`);
    dispatch({ type: LOGOUT_USER_SUCCESS, payload: data.user });
    localStorage.setItem('token', '');
    history.push('/logout');
  } catch (error) {
    dispatch({ type: LOGOUT_USER_ERROR, payload: error });
  }
};
