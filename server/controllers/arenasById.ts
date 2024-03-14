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
    });

    const overallWinRate = ideasCounted > 0 ? (totalWinRate / ideasCounted) : 0;

    const arenaWithDetails = {
      id: arena.id,
      name: arena.name,
      info_text: arena.info_text,
      total_ideas: totalIdeas,
      overall_win_rate: overallWinRate.toFixed(2) + '%',
    };

    res.status(200).json(arenaWithDetails);
  } catch (error) {
    console.error('Error fetching arena:', error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};
