import { createSlice } from "@reduxjs/toolkit";

export interface AuthStateType {
	user: {
		id: string;
		name: string;
		email: string;
		role: string;
		tenent_id?: string;
	};
	isAuthenticated?: Boolean;
	accessToken: string;
}

const initialState: AuthStateType = {
	user: {
		id: "",
		name: "",
		email: "",
		role: "",
		tenent_id: "",
	},
	isAuthenticated: false,
	accessToken: "",
};

export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		login: (state, action) => {
			state.user = action.payload.user;
			state.accessToken = action.payload.accessToken;
			state.isAuthenticated = true;
		},
		logout: (state) => {
			state = initialState;
		},
	});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
