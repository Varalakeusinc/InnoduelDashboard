import axios, { AxiosError, AxiosResponse } from "axios";
// Next we make an 'instance' of it
const instance = axios.create({
	baseURL: "http://localhost:8000",
});

instance.interceptors.response.use(
	(response: AxiosResponse) => {
		// If the request was successful, return the response directly
		return response;
	},
	(error: AxiosError) => {
		// If an error occurred in the request, handle it here
		if (axios.isAxiosError(error)) {
			// AxiosError includes additional information like response and request
			const axiosError: AxiosError = error;
			console.error(
				"\x1b[94m%s\x1b[0m",
				"Axios error occurred:",
				axiosError.message
			);
			// Log the response data if available
			if (axiosError.response?.data) {
				console.error(
					"\x1b[94m%s\x1b[0m",
					"Request failed with data:",
					axiosError.response.data
				);
			}
			// Throw the error again to propagate it
			throw error;
		} else {
			// Handle other types of errors (e.g., network errors)
			console.error("An unexpected error occurred:", error);
			// Throw the error again to propagate it
			throw error;
		}
	}
);

export default instance;
