import { LoginForm } from "@/components/login-form";
import { Link } from "react-router-dom";

const LoginPage = () => {
	return (
		<>
			<div className="lg:p-8 h-full flex">
				<div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
					<div className="flex flex-col space-y-2 text-center">
						<h1 className="text-2xl font-semibold tracking-tight">
							Log in
						</h1>
						<p className="text-sm text-muted-foreground">
							Don't have an account?{" "}
							<Link
								to="/authentication"
								className="text-blue-500"
							>
								Sign up
							</Link>
						</p>
					</div>
					<LoginForm />
				</div>
			</div>
		</>
	);
};

export default LoginPage;
