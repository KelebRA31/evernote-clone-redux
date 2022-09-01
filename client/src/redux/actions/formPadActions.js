import { SET_PAD, NEW_PAD } from '../types/types';

export const setPad = (data) => ({ type: SET_PAD, payload: data });
export const newPad = (data) => ({ type: NEW_PAD, payload: data });
