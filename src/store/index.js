import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import reducers from '../reducers';

const configureStore = (preloadedState) => {
  const store = createStore(
    combineReducers({
      ...reducers,
      routing,
    }),
    preloadedState,
    compose(applyMiddleware(thunk, createLogger()))
  );
  return store;
};

export default configureStore;
