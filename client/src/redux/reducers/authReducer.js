import { SET_AUTH, LOGOUT } from '../types/types';

export default (state = null, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_AUTH:
      return payload;

    case LOGOUT:
      return null;

    default:
      return state;
  }
};
