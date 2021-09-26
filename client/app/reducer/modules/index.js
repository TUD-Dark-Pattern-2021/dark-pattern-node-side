import { combineReducers } from 'redux';
import user from './user.js';
import anime from './anime'

const reducerModules = {
  user,
  anime
};

export default combineReducers(reducerModules);
