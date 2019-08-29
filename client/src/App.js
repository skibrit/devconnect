import React,{Fragment,useEffect} from 'react';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import Home from "./components/home/home";
import Register from "./components/auth/register";
import Login from "./components/auth/login";
import Navbar from "./components/layouts/navbar/navbar";
import Dashboard from "./components/dashboard/dashboard";
import Alert from "./components/layouts/alert/alert";
import PrivateRoute from "./components/privateRoute/privateRoute";
import {authenticateUser} from "./actions/auth";
import './App.scss';

//redux store
import {Provider} from 'react-redux';
import Store from './store';

function App() {

   useEffect(()=>{
       Store.dispatch(authenticateUser());
   },[]);

  return (
      <Provider store={Store}>
          <Router>
              <Fragment>
                  <Navbar/>
                  <Route exact path="/" component={Home} />
                  <section className='container section-wrapper'>
                          <Alert/>
                          <Switch>
                              <Route exact path="/register" component={Register} />
                              <Route exact path="/login" component={Login} />
                              <PrivateRoute exact path="/dashboard" component={Dashboard} />
                          </Switch>
                  </section>
              </Fragment>
          </Router>
      </Provider>
  );
}

export default App;
