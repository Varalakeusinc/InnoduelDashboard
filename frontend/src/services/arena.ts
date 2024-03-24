import { AxiosResponse } from "axios";
import axios from "@/lib/axios";
import { Idea } from "./ideas";

export interface Arena {
	id: string;
	name: string;
	description: string;
	info_text: string | null;
	total_ideas: number;
	total_votes: number;
	overall_win_rate: string;
	company_id: number;
	ideas: Idea[];
}

export interface ArenaIdeaCompareData {
	idea_text: string;
	arena1_winRate: number;
	arena2_winRate: number;
}

const getArenas = async (companyId: number): Promise<Arena[]> => {
	try {
		const response: AxiosResponse = await axios.get(
			`/api/arenas/${companyId}/arenas`
		);
		return response.data;
	} catch (error) {
		throw handleError(error);
	}
};

const getArenaById = async (
	companyId: number,
	arenaId: number
): Promise<Arena> => {
	try {
		const response: AxiosResponse = await axios.get(
			`/api/arenas/${companyId}/${arenaId}`
		);
		return response.data;
	} catch (error) {
		throw handleError(error);
	}
};

const getSimilarArenas = async (companyId: number, arenaId: number): Promise<Arena[]> => {
	try {
		const response: AxiosResponse<Arena[]> = await axios.get(
			`/api/arenas/${companyId}/find_matching_arenas/${arenaId}`
		);
		return response.data;
	} catch (error) {
		throw handleError(error);
	}
};

async function compareArenas(companyId: number, arenaId1: number, arenaId2: number): Promise<ArenaIdeaCompareData[]> {
	try {
		const response: AxiosResponse<ArenaIdeaCompareData[]> = await axios.get(
			`/api/arenas/${companyId}/compare_win_rate/${arenaId1}/${arenaId2}`
		);
		return response.data;
	} catch (error) {
		throw handleError(error);
	}
}

const handleError = (error: any) => {
	if (error.response) {
		return error.response.data.message || "Unknown error occurred";
	} else {
		return error.message || "Unknown error occurred";
	}
};

export const arenaService = { getArenas, getArenaById, getSimilarArenas, compareArenas };