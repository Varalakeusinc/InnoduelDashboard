import { type Request, type Response } from 'express';
import prisma from '../utils/db';

export const getSimilarArenas = async (req: Request, res: Response) => {
  const { companyId, arenaId } = req.params;

  try {
    const arenas = await prisma.arena.findMany({
      where: {
        company_id: parseInt(companyId)
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

    const filteredArena = arenas.find(arena => arena.id === parseInt(arenaId));
    if (!filteredArena) {
      return res.status(404).json({ message: 'Arena not found' });
    }

    const filteredIdeas = filteredArena.idea.map(idea => idea.idea_text);

    function compareIdeas(filteredIdeas: string[], ideas: { idea_text: string }[]): boolean {
      if (filteredIdeas.length !== ideas.length) {
        return false;
      }

      const ideaSet = new Set(filteredIdeas);
      for (const idea of ideas) {
        if (!ideaSet.has(idea.idea_text)) {
          return false;
        }
      }

      return true;
    }

    const similarArenas = arenas.filter(arena => arena.id !== parseInt(arenaId) && compareIdeas(filteredIdeas, arena.idea));

    if (similarArenas.length === 0) {
      return res.status(404).json({ message: 'No arenas with similar ideas found' });
    }

    const response = similarArenas.map(arena => {
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

    res.status(200).json(response);
  } catch (error) {
    console.error('Error retrieving similar arenas:', error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};
