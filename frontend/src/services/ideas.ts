import { AxiosResponse } from "axios";
import axios from "@/lib/axios";
import { Arena } from "./arena";
import { UserInfo } from "./users";
import { Vote } from "./vote";

export type Idea = {
	id: number;
	idea_text: string;
	user_id: number;
	arena_id: number;
	created: Date;
	active: boolean;
	win_rate?: number | null;
	win_rate_updated?: Date | null;
	is_deleted?: boolean | null;
	is_deleted_time?: Date | null;
	is_deleted_by_user_id?: number | null;
	is_seed?: boolean | null;
	arena: Arena;
	user_info_idea_is_deleted_by_user_idTouser_info?: UserInfo | null;
	user_info_idea_user_idTouser_info: UserInfo;
	vote: Vote[];
	vote_count: number;
};

async function getAllIdeas(): Promise<Idea[]> {
	try {
		const response: AxiosResponse = await axios.get("/api/ideas");
		return response.data;
	} catch (error) {
		throw error;
	}
}

export const ideaService = { getAllIdeas };
