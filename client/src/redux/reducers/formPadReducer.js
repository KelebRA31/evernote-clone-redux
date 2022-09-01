import { SET_PAD, NEW_PAD } from '../types/types';

export default (state = [], action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_PAD:
      return payload;
    case NEW_PAD:
      return [...state, payload];

    default:
      return state;
  }
};
