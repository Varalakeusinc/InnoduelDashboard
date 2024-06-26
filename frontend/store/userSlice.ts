import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

export type User = {
	companyId: number;
	username: string | "Admin";
	email: string;
	isAdmin: boolean;
};

type UserState = {
	currentUser: User | null;
	currentCompany: { companyId: number; companyName: string };
};

const initialState: UserState = {
	currentUser: {
		companyId: -1,
		username: "",
		email: "",
		isAdmin: false,
	},
	currentCompany: { companyName: "Default company", companyId: 3 },
};

// User redux slice
export const counterSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		setUser: (state, action: PayloadAction<User>) => {
			state.currentUser = action.payload;
		},

		setCompany: (
			state,
			action: PayloadAction<{ companyId: number; companyName: string }>
		) => {
			state.currentCompany = action.payload;
		},
	},
});

export const { setUser, setCompany } = counterSlice.actions;

export const selectUser = (state: RootState) => state.user.currentUser;
export const selectIsLoggedIn = (state: RootState) =>
	state.user.currentUser?.companyId !== -1;

export const selectCompanyId = (state: RootState) =>
	state.user.currentCompany.companyId;

export const selectCompanyName = (state: RootState) =>
	state.user.currentCompany.companyName;

export default counterSlice.reducer;
