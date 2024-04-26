import { defineConfig } from "cypress";

export default defineConfig({
	// Set the desired viewport width
	viewportWidth: 1920,

	// Set the desired viewport height
	viewportHeight: 1080,

	e2e: {
		setupNodeEvents(on, config) {
			// implement node event listeners here
		},
	},

	component: {
		devServer: {
			framework: "react",
			bundler: "webpack",
		},
	},
});
