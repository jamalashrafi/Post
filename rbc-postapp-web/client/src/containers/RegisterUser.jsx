import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { registerUser } from '../actions/userAction';

const RegisterUser = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const userState = useSelector((state) => state.userReducer);
  const { loading, error } = userState;

  const handleSubmit = (event) => {
    const loginObj = { name, email, password };
    dispatch(registerUser(loginObj));
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
              placeholder="Name"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
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
            <button type="submit">Register</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default RegisterUser;
