import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import HomeScreen from './components/HomeScreen';
import Login from './containers/Login';
import Register from './containers/RegisterUser';
import { fetchAllPosts } from './actions/postsAction';
import Logout from './components/Logout';
import Dashboard from './containers/Dashboard';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllPosts());
  }, [dispatch]);

  return (
    <Router>
      <div>
        <Route exact path="/" component={HomeScreen} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/logout" component={Logout} />
      </div>
    </Router>
  );
}

export default App;
