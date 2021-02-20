import React from 'react';
import {Switch, Route} from 'react-router-dom';
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Login from './pages/auth/Login';
import Home from './pages/Home';
import Register from './pages/auth/Register';
import Header from "./components/nav/Header";


const App = () => {
  return (
     <>
         <Header />
         <ToastContainer />
        <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/Login' component={Login}  />
            <Route exact path='/Register'  component={Register}  />
        </Switch>
     </>
  );
}

export default App;
