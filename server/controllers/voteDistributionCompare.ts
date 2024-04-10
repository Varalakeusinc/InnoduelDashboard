import { type Request, type Response } from 'express';
import prisma from '../utils/db';

export const getVoteDistributionCompare = async (req: Request, res: Response) => {
  const { companyId } = req.params;
  const { arena_ids: arenaIdsAll } = req.query;

  let arenaIds: number[] = [];

  if (typeof arenaIdsAll === 'string') {
    arenaIds = arenaIdsAll.split(',').map(id => parseInt(id.trim(), 10)).filter(id => !isNaN(id));
  } else if (Array.isArray(arenaIdsAll)) {
    arenaIds = arenaIdsAll.map(id => parseInt(String(id), 10)).filter(id => !isNaN(id));
  }

  if (arenaIds.length < 2) {
    return res.status(400).json({ error: 'At least two arena IDs are required for comparison' });
  }

  try {
    const arenas = await prisma.arena.findMany({
      where: {
        id: { in: arenaIds },
        company_id: parseInt(companyId),
      },
      select: {
        id: true,
        name: true,
        idea: {
          select: {
            id: true,
            idea_text: true,
            vote: {
              select: {
                win: true,
              },
            },
          },
        },
      },
    });

    const comparisonData = arenas.map(arena => {
      const totalIdeas = arena.idea.length;
      let totalVotes = 0;

      arena.idea.forEach(idea => {
        totalVotes += idea.vote.length;
      });

      return {
        arena_id: arena.id,
        arena_name: arena.name,
        total_ideas: totalIdeas,
        total_votes: totalVotes,
      };
    });

    res.status(200).json(comparisonData);
  } catch (error) {
    console.error("Error comparing arenas:", error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};
