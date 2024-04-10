import Layout from "@/components/layout";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/home";
import LoginPage from "./pages/login";
import Arenas from "./pages/Arenas";
import ArenaPage from "./pages/Arena";
import Compare from "./pages/Compare";
import { useAppSelector } from "@/store/hooks";
import { selectUser } from "@/store/userSlice";
import { useTranslation } from "react-i18next";

const App = () => {
	const { t } = useTranslation();
	return (
		<>
			<Routes>
				<Route
					path="/"
					element={
						<PrivateRoutes>
							<HomePage />
						</PrivateRoutes>
					}
				/>
				<Route
					path="/compare"
					element={
						<PrivateRoutes>
							<Compare />
						</PrivateRoutes>
					}
				/>
				<Route
					path="/arenas"
					element={
						<PrivateRoutes>
							<Arenas />
						</PrivateRoutes>
					}
				/>
				<Route
					path="/arena/:id"
					element={
						<PrivateRoutes>
							<ArenaPage />
						</PrivateRoutes>
					}
				/>
				<Route path="/login" element={<LoginPage />} />
				{/* Add not found component later */}
				<Route
					path="*"
					element={
						<PrivateRoutes>
							<h1>{t("not_found")}</h1>
						</PrivateRoutes>
					}
				/>
			</Routes>
		</>
	);
};

interface PrivateRoutesProps {
	children: React.ReactNode;
}

const PrivateRoutes = ({ children }: PrivateRoutesProps) => {
	const user = useAppSelector(selectUser);

	return user?.companyId === -1 ? (
		<Navigate to="/login" />
	) : (
		<Layout>{children}</Layout>
	);
};

export default App;
