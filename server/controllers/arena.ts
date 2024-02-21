import { type Request, type Response } from 'express';
import db from '../utils/db';

export const getAll = async (req: Request, res: Response) => {
  try {
    const arenas = await db.arena.findMany({
      select: {
        id: true,
        name: true,
        info_text: true
      }
    });
    if (arenas.length === 0) {
      return res.status(404).json({ message: 'Not found' });
    }
    res.status(200).json(arenas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};
