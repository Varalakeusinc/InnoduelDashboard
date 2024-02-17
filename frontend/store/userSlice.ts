import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

type UserState = {
	user: User;
};

type User = {
	userId: number | null;
	username: string | null;
};

const initialState: UserState = {
	user: {
		userId: 1,
		username: "Jane Doe",
	},
};

// User redux slice
export const counterSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		setUser: (state, action: PayloadAction<User>) => {
			state.user = action.payload;
		},
	},
});

///
/// If you want to use user in some component
/// const user = useAppSelector(state => state.user.user);
///

export const { setUser } = counterSlice.actions;

export const selectUser = (state: RootState) => state.user;

export default counterSlice.reducer;
