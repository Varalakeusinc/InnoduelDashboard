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
	company_id: number;
	ideas: Idea[];
}

const getArenas = async (companyId: number): Promise<Arena[]> => {
	try {
		const response: AxiosResponse = await axios.get(
			`/api/arenas/${companyId}/arenas`
		);
		return response.data;
	} catch (error) {
		throw error;
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
		throw error;
	}
};

const findMatchingArenas = async (companyId: number, arenaId: number) => {
	try {
		const response: AxiosResponse = await axios.get(
			`/api/arenas/${companyId}/find_matching_arenas/${arenaId}`
		);
		return response.data;
	} catch (error) {
		throw error;
	}
};

const compareWinRate = async (
	companyId: number,
	arenaId: number,
	arenaId2: number
) => {
	try {
		const response: AxiosResponse = await axios.get(
			`/api/arenas/${companyId}/compare_win_rate/${arenaId}/${arenaId2}`
		);
		return response.data;
	} catch (error) {
		throw error;
	}
};

export const arenaService = {
	getArenas,
	getArenaById,
	findMatchingArenas,
	compareWinRate,
};
