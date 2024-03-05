import { type Request, type Response } from 'express';
import prisma from '../utils/db';

export const getVoteDistributionByCompanyId = async (req: Request, res: Response) => {
  const { company_id: companyId } = req.params;

  try {
    const ideas = await prisma.idea.findMany({
      where: {
        arena: {
          company_id: parseInt(companyId),
        },
      },
      select: {
        id: true,
        idea_text: true,
        vote: {
          select: {
            win: true,
          },
        },
        arena: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    if (ideas.length === 0) {
      return res.status(404).json({ message: "No ideas found for the given company_id" });
    }

    let grandTotalVotes = 0;

    const voteDistribution = ideas.map(idea => {
      const totalVotes = idea.vote.length;
      grandTotalVotes += totalVotes;

      return {
        idea_id: idea.id,
        idea_text: idea.idea_text,
        arena_id: idea.arena.id,
        arena_name: idea.arena.name,
        total_votes: totalVotes,
      };
    });

    res.status(200).json({
      total_votes: grandTotalVotes,
      vote_distributions: voteDistribution,
    });
  } catch (error) {
    console.error("Error fetching vote distribution by company_id:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
