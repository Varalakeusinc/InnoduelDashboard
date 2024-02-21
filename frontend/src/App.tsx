import Layout from "@/components/layout";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/home";
import AuthenticationPage from "./pages/authentication";

function App() {
	return (
		<>
			<Layout>
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route
						path="/authentication"
						element={<AuthenticationPage />}
					/>
				</Routes>
			</Layout>
		</>
	);
}

export default App;
