import type { AuthUser } from "@/types/auth";
import { createSlice } from "@reduxjs/toolkit";

export interface AuthStateType {
  user: AuthUser | null;
  accessToken: string;
  isAuthenticated: boolean;
}

function hasAccessToken(): boolean {
  const token = localStorage.getItem("accessToken");

  return token !== null && token !== "undefined" && token.trim() !== "";
}

const initialState: AuthStateType = {
  user:  localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")!) : null,
  accessToken: localStorage.getItem("accessToken") || "",
  isAuthenticated: hasAccessToken(),
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.token;
      state.isAuthenticated = true;

      localStorage.setItem("accessToken", action.payload.token);
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
