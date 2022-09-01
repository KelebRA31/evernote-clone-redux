import { combineReducers } from 'redux';

import authReducer from './authReducer';
import padReducer from './formPadReducer';

const rootReducer = combineReducers({

  auth: authReducer,
  pad: padReducer,
});

export default rootReducer;
