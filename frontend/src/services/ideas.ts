import { AxiosResponse } from "axios";
import axios from "@/lib/axios";
import { Idea } from "./arena";

async function getAllIdeas(): Promise<Idea[]> {
	try {
		const response: AxiosResponse = await axios.get("/api/ideas");
		return response.data;
	} catch (error) {
		throw error;
	}
}

export const ideaService = { getAllIdeas };
