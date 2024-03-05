import * as React from "react";
import { cn } from "@/lib/utils";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
	selectCompanyName,
	selectIsLoggedIn,
	selectUser,
	setIsLoggedIn,
	setUser,
} from "@/store/userSlice";
import { Link } from "react-router-dom";

export const Logo = () => {
	const isLoggedIn = useAppSelector(selectIsLoggedIn);
	const currentUser = useAppSelector(selectUser);
	const currentCompanyName = useAppSelector(selectCompanyName);

	const dispatch = useAppDispatch();

	// This is deleted after log in is done but functionality remains
	const defaultUser = React.useCallback(() => {
		dispatch(
			setUser({
				userId: 123,
				username: "Bob Smith",
				email: "any@any.com",
				isAdmin: false,
			})
		);
		dispatch(setIsLoggedIn(true));
	}, []);

	React.useEffect(() => {
		defaultUser();
	}, []);

	return (
		<div className="flex items-center gap-x-4">
			<Link to="/" className="hover:opacity-75 transition">
				<div className="rounded-full p-1 mr-12 shrink-0 lg:mr-0 lg:shrink">
					<img
						src="/innoduel_logo.webp"
						alt="Logo"
						className="lg:w-20 w-14"
					/>
				</div>
			</Link>
			<div className={cn("hidden lg:block")}>
				<p className="text-lg font-semibold">Innoduel Dashboard</p>
				<p className="text-xs text-muted-foreground">Motto</p>
				<p>
					{isLoggedIn ? currentUser?.username : "Not logged in"}{" "}
					{currentUser?.email} / {currentCompanyName}
				</p>
			</div>
		</div>
	);
};
