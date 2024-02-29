import { AxiosResponse } from "axios";
import axios from "@/lib/axios";

export type Company = {
	id: number;
	name: string;
	city: string;
};

async function getAllCompanies(): Promise<Company[]> {
	try {
		const response: AxiosResponse = await axios.get("/api/companies");
		return response.data;
	} catch (error) {
		throw error;
	}
}

export const companyService = { getAllCompanies };
