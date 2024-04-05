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
	const user = useAppSelector(selectUser);

	if (user && user.companyId === -1) {
		return (
			<>
				<Routes>
					<Route path="/login" element={<LoginPage />} />
					<Route path="*" element={<strong>Not found</strong>} />
				</Routes>
				<Navigate to="/login" />
			</>
		);
	}

	return (
		<>
			<Layout>
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/compare" element={<Compare />} />
					<Route path="/arenas" element={<Arenas />} />
					<Route path="/arena/:id" element={<ArenaPage />} />
					{/* Add not found component later */}
					<Route path="*" element={<strong>Not found</strong>} />
				</Routes>
			</Layout>
		</>
	);
};

export default App;
