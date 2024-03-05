import { LoginForm } from "@/components/login-form";

const LoginPage = () => {
	return (
		<>
			<div className="lg:p-8 h-full flex">
				<div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
					<div className="flex flex-col space-y-2 text-center">
						<h1 className="text-2xl font-semibold tracking-tight">
							Log in
						</h1>
					</div>
					<LoginForm />
				</div>
			</div>
		</>
	);
};

export default LoginPage;
