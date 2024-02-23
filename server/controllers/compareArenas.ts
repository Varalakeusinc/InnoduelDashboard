import { type Request, type Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const compareArenas = async (req: Request, res: Response) => {
  const { ids } = req.query;

  const idsArray: string[] = Array.isArray(ids) ? ids.map(String) : typeof ids === 'string' ? [ids] : [];

  if (idsArray.length < 2) {
    return res.status(400).json({ error: 'At least two arena IDs are required for comparison' });
  }

  const arenaIds: number[] = Array.isArray(ids) ? ids.map(id => parseInt(id as string)) : [parseInt(ids as string)];

  try {
    const arenas = await prisma.arena.findMany({
      where: {
        id: {
          in: arenaIds
        }
      },
      select: {
        id: true,
        name: true,
        description: true,
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

    if (arenas.length < 2) {
      return res.status(404).json({ message: 'One or more arenas not found' });
    }

    const comparisonData = arenas.map(arena => {
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
        description: arena.description,
        info_text: arena.info_text,
        ideas: arena.idea,
        total_ideas: totalIdeas,
        total_votes: totalVotes,
        overall_win_rate: overallWinRate.toFixed(2) + '%'
      };
    });

    res.status(200).json(comparisonData);
  } catch (error) {
    console.error('Error comparing arenas:', error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};
