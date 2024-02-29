import { AxiosResponse } from "axios";
import axios from "@/lib/axios";

export type Company = {
	id: number;
	name: string | null;
	billing_address: string | null;
	city: string | null;
	zip: string | null;
	country: string | null;
	logo_image_url: string | null;
	plan_id: number | null;
	valid_until: Date | null;
	stripe_customer_id: string | null;
	is_trial: boolean | null;
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
