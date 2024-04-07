import { LoginForm } from "@/components/login-form";

const LoginPage = () => {
	return (
		<>
			<div
				className="lg:p-8 h-full flex"
				style={{
					height: "100vh",
					width: "100%",
					backgroundColor: "#FFA500",
				}}
			>
				<div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px] p-10">
					<div
						className="flex flex-col space-y-2 text-center font-semibold text-2xl"
						style={{
							fontSize: "100%",
							color: "black",
							textShadow: "2px 2px 12px rgba(0, 0, 0, 0.5)",
						}}
					>
						InnoduelDashboard
						<h1 className="font-semibold tracking-tight">Log in</h1>
					</div>
					<LoginForm />
				</div>
			</div>
		</>
	);
};

export default LoginPage;
