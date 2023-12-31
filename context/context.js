import React from "react";
import { Dimensions } from "react-native";

export const auth = {
  email: "",
  name: "",
  surname: "",
  date: "",
};

export const cookie = null;

export const width = Dimensions.get("window").height;

export const height = Dimensions.get("window").height;

export const AuthContext = React.createContext({
  auth,
  cookie,
  width,
  height,
  toggleAuth: () => {},
  toggleCookie: () => {},
});

export const AuthProvider = AuthContext.Provider;
export const AuthConsumer = AuthContext.Consumer;
