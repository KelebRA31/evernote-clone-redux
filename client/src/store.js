import { configureStore } from '@reduxjs/toolkit';

import rootReducer from './redux/reducers/rootReducer';

export default configureStore({
  reducer: rootReducer,

});
