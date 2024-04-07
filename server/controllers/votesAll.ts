import { type Request, type Response } from 'express';
import prisma from '../utils/db';

export const getVotesByCompanyId = async (req: Request, res: Response) => {
  const { companyId } = req.params;

  try {
    const votes = await prisma.vote.findMany({
      where: {
        idea: {
          arena: {
            company_id: parseInt(companyId),
          },
        },
      },
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
            arena: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
        user_info: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    if (votes.length === 0) {
      return res.status(404).json({ message: "No votes found for the given company_id" });
    }

    res.status(200).json(votes);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};
