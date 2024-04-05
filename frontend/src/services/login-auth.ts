import axios from "@/lib/axios";
import { User } from "@/store/userSlice";

export interface Company {
	companyId: number;
	companyName: string;
}

export async function authenticateUser(
	email: string,
	password: string
): Promise<{ message: string; user: User, company: Company } | undefined> {
	try {
		const response = await axios.post("/api/auth/login", { email, password });

		return response.data;
	} catch (error) {
		console.error("Error with login authentication:", error);
		return;
	}
}

export async function logOutUser(): Promise<boolean> {
	try {
		await axios.post("/auth/logout");

		return true;
	} catch (error) {
		console.error("Error with logout:", error);
		return false;
	}
}
