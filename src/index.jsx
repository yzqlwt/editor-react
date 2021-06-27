import ReactDOM from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import configureStore from './store';
import LoginRoute from './components/login/Index';
import AppRoute from './app';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Switch>
        <Route exact path="/" component={LoginRoute} />
        <Route exact path="/app" component={AppRoute} />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('root')
);
