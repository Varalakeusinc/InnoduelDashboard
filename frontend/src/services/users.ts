import { AxiosResponse } from "axios";
import axios from "@/lib/axios";
import { MockArena, Idea } from "./arena";
import { Company } from "./companies";

export type UserInfo = {
	id: number;
	name: string | null;
	email: string | null;
	password: string | null;
	anon: boolean;
	created: Date | null;
	last_login: Date | null;
	company_id: number | null;
	marketing_consent: boolean | null;
	arena: MockArena[];
	idea_idea_is_deleted_by_user_idTouser_info: Idea[];
	idea_idea_user_idTouser_info: Idea[];
	company: Company | null;
};

async function getAllUsers(): Promise<UserInfo[]> {
	try {
		const response: AxiosResponse = await axios.get("/api/users");
		return response.data;
	} catch (error) {
		throw error;
	}
}

export const userService = { getAllUsers };
