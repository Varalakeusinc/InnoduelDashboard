import { Request, Response } from 'express';
import { getTestMockData } from '../mockData/test';


export const getAll = async (req: Request, res: Response) => {
    res.status(200).json(getTestMockData);
}
