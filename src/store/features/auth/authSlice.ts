import type { AuthUser } from "@/types/auth";
import { createSlice } from "@reduxjs/toolkit";

export interface AuthStateType {
  user: AuthUser | null;
  accessToken: string;
  isAuthenticated: boolean;
}

const initialState: AuthStateType = {
  user:  localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")!) : null,
  accessToken: localStorage.getItem("accessToken") || "",
  isAuthenticated: localStorage.getItem("accessToken") ? true : false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.isAuthenticated = true;

      localStorage.setItem("accessToken", action.payload.accessToken);
      localStorage.setItem("user", JSON.stringify(action.payload.user));
    },
    logout: (state) => {
      state.user = null;
      state.accessToken = "";
      state.isAuthenticated = false;

      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
