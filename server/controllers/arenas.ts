import { type Request, type Response } from 'express';
import prisma from '../utils/db';

export const getArenas = async (req: Request, res: Response) => {
  const { companyId } = req.params; 

  try {
    const arenas = await prisma.arena.findMany({
      where: {
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
                win: true
              }
            }
          }
        }
      }
    });

    if (arenas.length === 0) {
      return res.status(404).json({ message: 'No arenas found' });
    }

    const arenaList = arenas.map(arena => {
      const totalIdeas = arena.idea.length;
      let totalVotes = 0;
      let totalWinVotes = 0;

      arena.idea.forEach(idea => {
        totalVotes += idea.vote.length;
        totalWinVotes += idea.vote.filter(vote => vote.win).length;
      });

      const overallWinRate = totalVotes > 0 ? (totalWinVotes / totalVotes) * 100 : 0;

      return {
        id: arena.id,
        name: arena.name,
        info_text: arena.info_text,
        total_ideas: totalIdeas,
        total_votes: totalVotes,
        overall_win_rate: overallWinRate.toFixed(2) + '%'
      };
    });

    res.status(200).json(arenaList);
  } catch (error) {
    console.error('Error fetching arena:', error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};
