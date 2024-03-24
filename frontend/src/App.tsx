import Layout from "@/components/layout";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/home";
import LoginPage from "./pages/login";
import Arenas from "./pages/Arenas";
import ArenaPage from "./pages/Arena";
import Compare from "./pages/Compare";
import { useTranslation } from "react-i18next";

function App() {
	const { t } = useTranslation();
	return (
		<>
			<Layout>
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/compare" element={<Compare />} />
					<Route path="/arenas" element={<Arenas />} />
					<Route path="/arena/:id" element={<ArenaPage />} />
					<Route path="/login" element={<LoginPage />} />
					{/* Add not found component later */}
					<Route path="*" element={<strong>Not found</strong>} />
				</Routes>
			</Layout>
		</>
	);
}

export default App;
