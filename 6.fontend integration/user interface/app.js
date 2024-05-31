// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SignupForm from './signupform';
import LoginForm from './LoginForm';
import Profile from './Profile';
import UpdateProfileForm from './UpdateProfileForm';
import PrivateRoute from './privateroute';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/signup" component={SignupForm} />
        <Route exact path="/login" component={LoginForm} />
        <PrivateRoute exact path="/profile" component={Profile} />
        <PrivateRoute exact path="/profile/edit" component={UpdateProfileForm} />
      </Switch>
    </Router>
  );
};

export default App;