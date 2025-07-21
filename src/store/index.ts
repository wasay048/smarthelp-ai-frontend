import { createStore, combineReducers } from 'redux';
import authReducer from './authStore';

const rootReducer = combineReducers({
  auth: authReducer,
  // Add other reducers here as the project expands
});

const store = createStore(rootReducer);

export default store;