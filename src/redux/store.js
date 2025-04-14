import { legacy_createStore as createStore, compose } from 'redux'; // Using legacy for requirement
import rootReducer from './rootReducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers()
);

export default store;

