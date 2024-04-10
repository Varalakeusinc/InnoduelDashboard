import { cn } from "@/lib/utils";
import { useAppSelector } from "@/store/hooks";
import {
	selectCompanyName,
	selectIsLoggedIn,
	selectUser,
} from "@/store/userSlice";
import { Link } from "react-router-dom";

export const Logo = () => {
	const isLoggedIn = useAppSelector(selectIsLoggedIn);
	const currentUser = useAppSelector(selectUser);
	const currentCompanyName = useAppSelector(selectCompanyName);

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
				<p>
					{isLoggedIn ? currentUser?.username : "Not logged in"}{" "}
					{currentUser?.email} / {currentCompanyName}
				</p>
			</div>
		</div>
	);
};
