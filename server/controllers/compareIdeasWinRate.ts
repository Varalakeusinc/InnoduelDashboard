import { type Request, type Response } from 'express';
import prisma from '../utils/db';

interface IdeaComparison {
    idea_text: string
    arena1_winRate: number | null
    arena2_winRate: number | null
}

const scaleWinRate = (winRate: number | null) => {
    if (winRate !== null) {
        return winRate / 100;
    }
    return 0;
};

export const compareIdeasWinRate = async (req: Request, res: Response) => {
    const { companyId, arenaId1, arenaId2 } = req.params;

    const parsedCompanyId = parseInt(companyId, 10);
    const parsedArenaId1 = parseInt(arenaId1, 10);
    const parsedArenaId2 = parseInt(arenaId2, 10);
    if (isNaN(parsedArenaId1) || isNaN(parsedArenaId2)) {
        return res.status(400).json({ error: 'Both arenaId1 and arenaId2 must be valid integers.' });
    }

    try {
        const arenas = await Promise.all([
            prisma.arena.findFirst({
                where: {
                    id: parsedArenaId1,
                    company_id: parsedCompanyId,
                },
                include: {
                    idea: {
                        select: {
                            idea_text: true,
                            win_rate: true,
                        },
                    },
                },
            }),
            prisma.arena.findFirst({
                where: {
                    id: parsedArenaId2,
                    company_id: parsedCompanyId,
                },
                include: {
                    idea: {
                        select: {
                            idea_text: true,
                            win_rate: true,
                        },
                    },
                },
            }),
        ]);

        const [arena1, arena2] = arenas;

        if (arena1 === null || arena2 === null) {
            return res.status(404).json({ error: 'One or both arenas not found' });
        }

        const matchingIdeas = arena1.idea.reduce<IdeaComparison[]>((acc, idea1) => {
            const idea2 = arena2.idea.find(idea => idea.idea_text === idea1.idea_text);
            if (typeof idea2 !== 'undefined') {
                acc.push({
                    idea_text: idea1.idea_text,
                    arena1_winRate: scaleWinRate(idea1.win_rate),
                    arena2_winRate: scaleWinRate(idea2.win_rate),
                });
            }
            return acc;
        }, []);

        res.status(200).json(matchingIdeas);
    } catch (error) {
        console.error('Error comparing ideas between arenas:', error);
        res.status(500).json({ message: 'Something went wrong' });
    }
};
