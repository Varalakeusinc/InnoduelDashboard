import { AxiosResponse } from "axios";
import axios from "@/lib/axios";
import { Idea } from "./arena";
import { UserInfo } from "./users";

export type Vote = {
	id: number;
	user_id: number;
	idea_id: number;
	win: boolean;
	created: Date;
	idea: Idea;
	user_info: UserInfo;
};

async function getAllVotes(companyId: number): Promise<Vote[]> {
	try {
		const response: AxiosResponse = await axios.get(
			`/api/votes/${companyId}/all`
		);
		return response.data;
	} catch (error) {
		throw error;
	}
}

export const voteService = { getAllVotes };
