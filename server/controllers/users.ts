import { type Request, type Response } from "express";
import prisma from '../utils/db';

export const getUsers = async (req: Request, res: Response) => {
	try {
		const users = await prisma.user_info.findMany({
			select: {
				id: true,
				name: true,
				email: true,
				password: true,
				anon: true,
				created: true,
				last_login: true,
				company_id: true,
				marketing_consent: true,
				arena: true,
			},
		});

		if (users.length === 0) {
			return res.status(404).json({ message: "No users found" });
		}

		res.status(200).json(users);
	} catch (error) {
		console.error("Error fetching users:", error);
		res.status(500).json({ message: "Something went wrong" });
	}
};
