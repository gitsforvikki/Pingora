import api from "./api";

export const isLoggedIn = () => localStorage.getItem("user-token") ?? false;

export const getAuthToken = (): string | null =>
  localStorage.getItem("user-token");

export const setAuthToken = (token: string | null) => {
  if (token) {
    api.defaults.headers.common["x-auth-token"] = token;
  } else {
    delete api.defaults.headers.common["x-auth-token"];
  }
};
