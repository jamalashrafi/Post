import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../actions/userAction';
const isLogin = false;

const HeaderContainer = (props) => {
  const dispatch = useDispatch();
  const renderLogin = (path) => {
    props.history.push(path);
  };
  return (
    <div className="headerContainer">
      <label>The Blogger's Post...</label>

      {isLogin ? (
        <>
          <button onClick={() => renderLogin('/login')}>Login</button> |{' '}
          <button onClick={() => renderLogin('/register')}>Register</button>
        </>
      ) : (
        <>
          <button onClick={() => dispatch(logout())}>Logout</button> |{' '}
          <button onClick={() => dispatch(logout())}> LogoutAll </button>
        </>
      )}
    </div>
  );
};

export default HeaderContainer;
