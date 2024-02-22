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
};

const initialState: UserState = {
	currentUser: {
		userId: -1,
		username: "",
		email: "",
		isAdmin: false,
	},
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
	},
});

// If you want to use user in some component
// const user = useAppSelector(state => state.user.user);

// If you want to set values from any component
// const dispatch = useAppDispatch();

// 	dispatch(
// 		setUser({
// 			userId: 123,
// 			username: "Jane Doe",
// 			email: "example@example.com",
// 			isAdmin: false,
// 		})
// 	);
//
// 	dispatch(setIsLoggedIn(true));

export const { setUser, setIsLoggedIn } = counterSlice.actions;

export const selectUser = (state: RootState) => state.user.currentUser;
export const selectIsLoggedIn = (state: RootState) => state.user.isLoggedIn;

export default counterSlice.reducer;
