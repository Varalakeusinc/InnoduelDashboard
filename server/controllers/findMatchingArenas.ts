import { type Request, type Response } from 'express';
import prisma from '../utils/db';

export const findMatchingArenas = async (req: Request, res: Response) => {
    const { arenaId, companyId } = req.params;

    try {
        const parsedArenaId = parseInt(arenaId, 10);
        const parsedCompanyId = parseInt(companyId, 10);

        const targetArena = await prisma.arena.findUnique({
            where: { id: parsedArenaId },
            include: {
                idea: {
                    select: {
                        idea_text: true,
                    },
                },
            },
        });

        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        if (!targetArena || !targetArena.idea) {
            return res.status(404).json({ error: 'Target arena not found' });
        }

        const targetIdeas = targetArena.idea.map(idea => idea.idea_text);
        const targetIdeaCount = targetIdeas.length;

        const companyArenas = await prisma.arena.findMany({
            where: {
                company_id: parsedCompanyId,
                NOT: { id: parsedArenaId },
            },
            include: {
                idea: {
                    select: {
                        idea_text: true,
                    },
                },
            },
        });

        const matchingArenas = companyArenas.filter(arena => {
            const arenaIdeaTexts = arena.idea.map(idea => idea.idea_text.toLowerCase());
            const targetIdeaTextsLower = targetIdeas.map(text => text.toLowerCase());

            return (
                arena.idea.length === targetIdeaCount &&
                arenaIdeaTexts.every(text => targetIdeaTextsLower.includes(text)) &&
                targetIdeaTextsLower.every(text => arenaIdeaTexts.includes(text))
            );
        }).map(arena => ({
            id: arena.id,
            name: arena.name,
        }));

        res.status(200).json(matchingArenas);
    } catch (error) {
        console.error('Error finding matching arenas:', error);
        res.status(500).json({ message: 'Something went wrong' });
    }
};
