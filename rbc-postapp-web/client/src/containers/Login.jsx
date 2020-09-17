import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loginUser } from '../actions/userAction';

const Login = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const userState = useSelector((state) => state.userReducer);
  const { loading, error } = userState;

  const handleSubmit = (event) => {
    const loginObj = { email, password };
    dispatch(
      loginUser(loginObj, () => {
        props.history.push('/dashboard');
      })
    );
    event.preventDefault();
  };

  return (
    <>
      {loading && <div>Loading...</div>}
      {error && <div>error</div>}
      <div className="loginContainer">
        <div className="loginContainer__loginForm">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
