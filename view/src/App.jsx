import React from 'react';
import { BrowserRouter as Router, Route, useHistory } from 'react-router-dom';
import Signup from './components/Signup';
import Signin from './components/Signin';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import { useState, useEffect } from 'react';

const App = () => {
  return (
    <Router>
      <Routes />
    </Router>
  );
}

const Routes = () => {
  const history = useHistory();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => 
  {
    const loggedInStatus = sessionStorage.getItem('isLoggedIn');
    if (loggedInStatus === 'true') 
    {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
      history.push('/signin');
    }
  }, [history]);

  return (
    <>
      <Route path="/" exact>
        <Home/>
      </Route>
      <Route path="/signup">
        <Signup />
      </Route>
      <Route path="/signin">
        <Signin/>
      </Route>
      <Route path="/dashboard">
        <Dashboard/>
      </Route>
    </>
  );
}

export default App;
