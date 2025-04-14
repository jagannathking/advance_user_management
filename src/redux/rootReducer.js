import { combineReducers } from 'redux';
import userReducer from './reducer';


const rootReducer = combineReducers({
  userManagement: userReducer,
});

export default rootReducer;