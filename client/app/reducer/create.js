import { createStore as _createStore, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise';
import reducer from './modules/index';

export default function createStore(initialState = {}) {
  const middleware = [promiseMiddleware];

  let finalCreateStore;
  finalCreateStore = applyMiddleware(...middleware)(_createStore);

  const store = finalCreateStore(reducer,
    initialState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );

  return store;
}
