import { type Request, type Response } from 'express';
import prisma from '../utils/db';

export const getById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { companyId } = req.params;

  try {
    const arena = await prisma.arena.findUnique({
      where: {
        id: Number(id),
        company_id: parseInt(companyId),
      },
      select: {
        id: true,
        name: true,
        info_text: true,
        idea: {
          select: {
            id: true,
            idea_text: true,
            win_rate: true,
            vote: {
              select: {
                win: true,
              },
            },
          },
        },
      },
    });

    if (arena === null) {
      return res.status(404).json({ message: 'Arena not found or does not belong to the specified company' });
    }

    let totalWinRate = 0;
    let ideasCounted = 0;
    let totalArenaVotes = 0;
    const totalIdeas = arena.idea.length;

    arena.idea.forEach(idea => {
      if (idea.win_rate !== null) {
        totalWinRate += idea.win_rate;
        ideasCounted++;
      } else if (idea.vote.length > 0) {
        const winVotes = idea.vote.filter(vote => vote.win).length;
        const totalVotes = idea.vote.length;
        if (totalVotes > 5) {
          const winRate = Math.round((winVotes / totalVotes) * 100);
          totalWinRate += winRate;
          ideasCounted++;
        }
      }
      totalArenaVotes += idea.vote.length;
    });

    const overallWinRate = ideasCounted > 0 ? (totalWinRate / ideasCounted) : 0;

    const ideaList = arena.idea.map(idea => ({
      id: idea.id,
      idea_text: idea.idea_text,
      win_rate: idea.win_rate !== null ? idea.win_rate : 0,
      vote_count: idea.vote.length,
    }));

    const arenaWithDetails = {
      id: arena.id,
      name: arena.name,
      info_text: arena.info_text,
      total_ideas: totalIdeas,
      overall_win_rate: overallWinRate.toFixed(2) + '%',
      total_votes: totalArenaVotes,
      ideas: ideaList,
    };

    res.status(200).json(arenaWithDetails);
  } catch (error) {
    console.error('Error fetching arena:', error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};
