import { type Request, type Response } from "express";
import prisma from '../utils/db';

export const getVotes = async (req: Request, res: Response) => {
	try {
		const votes = await prisma.vote.findMany({
			select: {
				id: true,
				user_id: true,
				idea_id: true,
				win: true,
				created: true,
				idea: {
					select: {
						id: true,
						idea_text: true,
					},
				},
				user_info: {
					select: {
						id: true,
					},
				},
			},
		});

		if (votes.length === 0) {
			return res.status(404).json({ message: "No votes found" });
		}

		res.status(200).json(votes);
	} catch (error) {
		console.error("Error fetching votes:", error);
		res.status(500).json({ message: "Something went wrong" });
	}
};
