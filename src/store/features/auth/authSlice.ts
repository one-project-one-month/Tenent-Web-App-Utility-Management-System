import type { AuthUser } from "@/types/auth";
import { createSlice } from "@reduxjs/toolkit";

export interface AuthStateType {
  user: AuthUser | null;
  accessToken: string;
  isAuthenticated: boolean;
}

const initialState: AuthStateType = {
  user: null,
  accessToken: localStorage.getItem("accessToken") || "",
  isAuthenticated: !!localStorage.getItem("accessToken"),
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
    },
    logout: () => {
      localStorage.removeItem("accessToken");

      return initialState
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
