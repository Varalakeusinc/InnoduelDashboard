import Layout from "@/components/layout";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/home";
import LoginPage from "./pages/login";
import Arenas from "./pages/Arenas";
import ArenaPage from "./pages/Arena";
import Compare from "./pages/Compare";
import { useAppSelector } from "@/store/hooks";
import { selectUser } from "@/store/userSlice";

const App = () => {
	return (
		<>
			<Layout>
				<Routes>
					<Route element={<PrivateRoutes />}>
						<Route path="/" element={<HomePage />} />
						<Route path="/compare" element={<Compare />} />
						<Route path="/arenas" element={<Arenas />} />
						<Route path="/arena/:id" element={<ArenaPage />} />
						{/* Add not found component later */}
						<Route path="*" element={<strong>Not found</strong>} />
					</Route>
					<Route path="/login" element={<LoginPage />} />
				</Routes>
			</Layout>
		</>
	);
};

const PrivateRoutes = () => {
	const user = useAppSelector(selectUser);

	return user?.companyId === -1 ? <></> : <Navigate to="/login" />;
};

export default App;
