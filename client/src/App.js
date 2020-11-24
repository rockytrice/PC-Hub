import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Login from './pages/auth/Login';
import Home from './pages/Home';
import Register from './pages/auth/Register';


const App = () => {
  return (
    <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/Login' component={Login}  />
        <Route exact path='/Register'  component={Register}  />
    </Switch>
  );
}

export default App;
