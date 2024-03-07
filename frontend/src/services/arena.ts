import { AxiosResponse } from "axios";
import axios from "@/lib/axios";
import { Idea } from "./ideas";

export interface Arena {
    id: string;
    name: string;
	info_text: string | null;
	total_ideas: number;
    total_votes: number;
    overall_win_rate: string;
    ideas: Idea[];
}

async function getArenas(companyId: number): Promise<Arena[]> {
	try {
		const response: AxiosResponse = await axios.get(`/api/arenas/${companyId}/arenas`);
		return response.data;
	} catch (error) {
		throw error;
	}
}

export const arenaService = { getArenas };