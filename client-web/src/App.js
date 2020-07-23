import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Navigation from './components/Navigation';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import './App.css';
import { Provider } from 'react-redux';
import store from './store/store';



const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Navigation />
      <section className="container">
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/register' component={Register} />
          <Route exact path='/login' component={Login} />
        </Switch>
      </section>
    </BrowserRouter>
  </Provider>
);

export default App;
