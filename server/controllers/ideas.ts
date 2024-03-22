import { type Request, type Response } from "express";
import prisma from "../utils/db";

export const getIdeas = async (req: Request, res: Response) => {
	try {
		const ideas = await prisma.idea.findMany({
			select: {
				id: true,
				idea_text: true,
				user_id: true,
				arena_id: true,
				created: true,
				active: true,
				win_rate: true,
				win_rate_updated: true,
				is_deleted: true,
				is_deleted_time: true,
				is_deleted_by_user_id: true,
				is_seed: true,
				arena: true,
				user_info_idea_is_deleted_by_user_idTouser_info: true,
				user_info_idea_user_idTouser_info: true,
				inappropriate_idea: true,
				vote: true,
			},
		});

		if (ideas.length === 0) {
			return res.status(404).json({ message: "No ideas found" });
		}

		res.status(200).json(ideas);
	} catch (error) {
		console.error("Error fetching ideas:", error);
		res.status(500).json({ message: "Something went wrong" });
	}
};
