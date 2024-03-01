import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getArenaWinRateTrends = async (req: Request, res: Response) => {
    const { arena_id } = req.params;

    try {
        const winRateTrends = await prisma.idea.findMany({
            where: {
                arena_id: parseInt(arena_id),
            },
            select: {
                id: true,
                win_rate: true,
                win_rate_updated: true,
            }
        });

        winRateTrends.sort((a, b) => {
            const aWinRate = a.win_rate || 0;
            const bWinRate = b.win_rate || 0;
            const aUpdated = a.win_rate_updated || new Date(0);
            const bUpdated = b.win_rate_updated || new Date(0);

            // Sort by update dates (asc) & then sort by win rate (desc)
            if (aUpdated.getTime() === bUpdated.getTime()) {
                return bWinRate - aWinRate;
            } else {
                return aUpdated.getTime() - bUpdated.getTime();
            }
        });

        const trends = winRateTrends.map(idea => ({
            idea_id: idea.id,
            winRateOverTime: [{
                timestamp: idea.win_rate_updated?.toISOString() ?? new Date().toISOString(),
                winRate: (idea.win_rate || 0).toString() + '%'
            }]
        }));

        res.status(200).json({ arena_id: parseInt(arena_id), trends });
    } catch (error) {
        console.error('Error fetching win rate trends for arena:', error);
        res.status(500).json({ message: 'Something went wrong' });
    }
};
