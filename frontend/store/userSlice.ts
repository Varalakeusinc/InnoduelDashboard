import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

type User = {
	userId: number;
	username: string | "Admin";
	email: string;
	isAdmin: boolean;
};

type UserState = {
	currentUser: User | null;
	isLoggedIn: boolean;
	currentCompany: { companyId: number; companyName: string };
};

const initialState: UserState = {
	currentUser: {
		userId: -1,
		username: "",
		email: "",
		isAdmin: false,
	},
	currentCompany: { companyName: "Default company", companyId: 3 },
	isLoggedIn: false,
};

// User redux slice
export const counterSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		setUser: (state, action: PayloadAction<User>) => {
			state.currentUser = action.payload;
		},
		setIsLoggedIn: (state, action: PayloadAction<boolean>) => {
			state.isLoggedIn = action.payload;
		},
		setCompany: (
			state,
			action: PayloadAction<{ companyId: number; companyName: string }>
		) => {
			state.currentCompany = action.payload;
		},
	},
});

export const { setUser, setIsLoggedIn, setCompany } = counterSlice.actions;

export const selectUser = (state: RootState) => state.user.currentUser;
export const selectIsLoggedIn = (state: RootState) => state.user.isLoggedIn;

export const selectCompanyId = (state: RootState) =>
	state.user.currentCompany.companyId;

export const selectCompanyName = (state: RootState) =>
	state.user.currentCompany.companyName;

export default counterSlice.reducer;
