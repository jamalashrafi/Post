import {
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  REGISTER_USER_REQUEST,
  LOGOUT_USER_SUCCESS,
} from '../constants/UserConstants';

const initialState = {
  name: '',
  email: '',
  password: '',
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_USER_REQUEST:
      return { ...state, loading: true };

    case REGISTER_USER_SUCCESS:
      return {
        ...state,
        name: action.payload.name,
        email: action.payload.email,
        success: true,
        loading: false,
      };

    case REGISTER_USER_ERROR:
      return { ...state, error: action.payload, loading: false };

    case LOGIN_USER_REQUEST:
      return { ...state, loading: true };

    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        name: action.payload.name,
        email: action.payload.email,
        success: true,
        loading: false,
      };

    case LOGIN_USER_ERROR:
      return { ...state, error: action.payload, loading: false };

    case LOGOUT_USER_SUCCESS:
      return { ...state, name: '', email: '' };

    default:
      return state;
  }
};
