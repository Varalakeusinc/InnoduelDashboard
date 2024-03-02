import { type Request, type Response } from "express";
import prisma from '../utils/db';

export const getCompanies = async (req: Request, res: Response) => {
	try {
		const companies = await prisma.company.findMany({
			select: {
				id: true,
				name: true,
				billing_address: true,
				city: true,
				zip: true,
				country: true,
				logo_image_url: true,
				plan_id: true,
				valid_until: true,
				stripe_customer_id: true,
				is_trial: true,
			},
		});

		if (companies.length === 0) {
			return res.status(404).json({ message: "No companies found" });
		}

		res.status(200).json(companies);
	} catch (error) {
		console.error("Error fetching companies:", error);
		res.status(500).json({ message: "Something went wrong" });
	}
};
