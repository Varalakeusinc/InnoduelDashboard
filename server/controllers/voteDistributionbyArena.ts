import { type Request, type Response } from 'express';
import prisma from '../utils/db';

export const getVoteDistributionByCompanyAndArena = async (req: Request, res: Response) => {
  const { companyId, arena_id: arenaId } = req.params;

  try {
    const ideas = await prisma.idea.findMany({
      where: {
        arena: {
          company_id: parseInt(companyId),
          id: parseInt(arenaId),
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
      return res.status(404).json({ message: "No ideas found for the given company_id and arena_id" });
    }

    const voteDistribution = ideas.map(idea => {
      const totalVotes = idea.vote.length;

      return {
        idea_id: idea.id,
        idea_text: idea.idea_text,
        arena_id: idea.arena.id,
        arena_name: idea.arena.name,
        total_votes: totalVotes,
      };
    });

    const totalVotesAcrossArena = voteDistribution.reduce((acc, idea) => acc + idea.total_votes, 0);

    res.status(200).json({
      total_votes: totalVotesAcrossArena,
      vote_distributions: voteDistribution,
    });
  } catch (error) {
    console.error("Error fetching vote distribution by company_id and arena_id:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
