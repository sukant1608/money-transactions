import { SET_CURRENT_USER } from "../actionTypes";
import { addError, removeError } from "./error";
import api from "../../services/api";
import decode from "jwt-decode";
export const setCurrentUser = (user) => ({
  type: SET_CURRENT_USER,
  payload: user,
});

export const setToken = (token) => {
  api.setToken(token);
};

export const logout = () => {
  return (dispatch) => {
    localStorage.clear();
    dispatch(setCurrentUser({}));
    dispatch(removeError());
  };
};

export const authUser = (path, data) => {
  return async (dispatch) => {
    try {
      const { token, ...user } = await api.call("post", `auth/${path}`, data);
      console.log(decode(token));
      localStorage.setItem("jwtToken", token);
      api.setToken(token);
      dispatch(setCurrentUser(user));
      dispatch(removeError());
    } catch (err) {
      const error = err.response.data;
      dispatch(addError(error.message));
    }
  };
};
