import { LOGOUT, SET_AUTH } from '../types/types';

export const setAuth = (data) => ({ type: SET_AUTH, payload: data });

export const logout = () => ({ type: LOGOUT });
