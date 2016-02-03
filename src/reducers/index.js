import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import queryCompanies from './queryCompanies.js';

const rootReducer = combineReducers({
  form: formReducer,
  /* your reducers */
  queryCompanies
});

export default rootReducer;
