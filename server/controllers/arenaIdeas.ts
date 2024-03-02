import { type Request, type Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getIdeasOfArena = async (req: Request, res: Response) => {
    const { companyId, arenaId } = req.params;
    const { sort, order, minVotes } = req.query;

    const minVotesThreshold = minVotes !== undefined ? parseInt(minVotes as string) : 0;

    try {
        const arena = await prisma.arena.findUnique({
            where: {
                id: parseInt(arenaId),
                company_id: parseInt(companyId),
            },
            include: {
                idea: {
                    select: {
                        id: true,
                        idea_text: true,
                        win_rate: true,
                        created: true,
                        vote: {
                            select: {
                                win: true,
                            },
                        },
                        user_info_idea_user_idTouser_info: {
                            select: {
                                id: true,
                                name: true,
                            },
                        },
                    },
                },
            },
        });

        if (arena === null || arena === undefined) {
            return res.status(404).json({ message: 'Arena not found' });
        }

        let ideas = arena.idea.map(idea => ({
            idea_id: idea.id,
            idea_text: idea.idea_text,
            win_rate: idea.win_rate ?? 0,
            total_votes: idea.vote.length,
            created_at: idea.created,
            author: {
                user_id: idea.user_info_idea_user_idTouser_info.id,
                username: idea.user_info_idea_user_idTouser_info.name,
            },
        }));

        if (sort !== undefined && sort !== null) {
            switch (sort) {
                case 'win_rate':
                    ideas = ideas.sort((a, b) => (order === 'asc' ? a.win_rate - b.win_rate : b.win_rate - a.win_rate));
                    break;
                case 'total_votes':
                    ideas = ideas.sort((a, b) => (order === 'asc' ? a.total_votes - b.total_votes : b.total_votes - a.total_votes));
                    break;
                default:
                    break;
            }
        }

        ideas = ideas.filter(idea => idea.total_votes >= minVotesThreshold);

        res.status(200).json(ideas);
    } catch (error) {
        console.error('Error fetching ideas for arena:', error);
        res.status(500).json({ message: 'Something went wrong' });
    }
};
