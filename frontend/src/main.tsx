import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { persistor, store } from "@/store/store.ts";
import { PersistGate } from "redux-persist/integration/react";
import LoadingIndicator from "@/components/loadingIndicator/LoadingIndicator.tsx";
import "./i18n";
import { initI18n } from "./i18n";

const onBeforeLift = () => {
	initI18n();
};

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<BrowserRouter>
			<Provider //
				store={store}
			>
				<PersistGate //
					loading={<LoadingIndicator />}
					persistor={persistor}
					onBeforeLift={onBeforeLift}
				>
					<App />
				</PersistGate>
			</Provider>
		</BrowserRouter>
	</React.StrictMode>
);
