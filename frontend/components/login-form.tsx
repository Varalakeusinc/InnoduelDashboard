import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAppDispatch } from "@/store/hooks";
import { setCompany, setUser } from "@/store/userSlice";
import { authenticateUser } from "@/src/services/login-auth";
import { useNavigate } from "react-router-dom";

interface LoginFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function LoginForm({ className, ...props }: LoginFormProps) {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");

	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	async function onSubmit(event: React.SyntheticEvent) {
		event.preventDefault();
		setIsLoading(true);
		setError(null);

		try {
			const isAuthenticated = await authenticateUser(email, password);

			if (!isAuthenticated) {
				throw Error();
			}

			dispatch(setUser(isAuthenticated.user));
			dispatch(setCompany(isAuthenticated.company));

			// This navigates to homepage
			navigate("/");
		} catch (error) {
			console.error("Error during authentication:", error);
			setError("An error occurred during authentication.");
		} finally {
			setIsLoading(false);
		}
	}

	return (
		<div className={cn("grid gap-6", className)} {...props}>
			<form onSubmit={onSubmit}>
				<div className="grid gap-2">
					<div className="grid gap-2">
						<Label className="sr-only" htmlFor="email">
							Email
						</Label>
						<Input
							data-test-id="logInEmailField"
							id="email"
							placeholder="name@example.com"
							type="email"
							autoCapitalize="none"
							autoComplete="email"
							autoCorrect="off"
							disabled={isLoading}
							value={email}
							onChange={e => setEmail(e.target.value)}
						/>
						<Label className="sr-only" htmlFor="password">
							Password
						</Label>
						<Input
							data-test-id="logInPasswordField"
							id="password"
							placeholder="Password"
							type="password"
							autoCapitalize="none"
							autoCorrect="off"
							disabled={isLoading}
							value={password}
							onChange={e => setPassword(e.target.value)}
						/>
					</div>
					<Button
						disabled={isLoading}
						id="loginButton"
						className="bg-orange-950"
					>
						{isLoading && (
							<Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
						)}
						Login
					</Button>
					{error && (
						<p className="bg-red-600 text-white p-2 rounded-md">
							{error}
						</p>
					)}
				</div>
			</form>
		</div>
	);
}
