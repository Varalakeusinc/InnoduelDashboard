import { type Request, type Response } from 'express';
import prisma from '../utils/db';
import ExcelJS from 'exceljs';

export const exportExcel = async (req: Request, res: Response) => {
    const { company_id: companyId } = req.params;

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

        if (arenas.length === 0) {
            return res.status(404).json({ message: 'No arenas found' });
        }

        const workbook = new ExcelJS.Workbook();
        const sheet = workbook.addWorksheet('Arenas');

        sheet.columns = [
            { header: 'Arena Name', key: 'name', width: 40 },
            { header: 'Info Text', key: 'info_text', width: 60 },
            { header: 'Idea Text', key: 'idea_text', width: 60 },
            { header: 'Win Rate', key: 'win_rate', width: 10 },
            { header: 'Vote Count', key: 'vote_count', width: 10 },
        ];

        arenas.forEach(arena => {
            arena.idea.forEach(idea => {
                const winRate = idea.win_rate !== null ? `${idea.win_rate}%` : 'N/A';

                sheet.addRow({
                    name: arena.name,
                    info_text: arena.info_text,
                    idea_text: idea.idea_text,
                    win_rate: winRate,
                    vote_count: idea.vote.length,
                });
            });
        });

        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', `attachment; filename="report.xlsx"`);

        await workbook.xlsx.write(res);
        res.status(200).end();
    } catch (error) {
        console.error('Error exporting arenas:', error);
        res.status(500).json({ message: 'Something went wrong' });
    }
};
