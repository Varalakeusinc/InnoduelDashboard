import { Request, Response } from 'express';
import { Test } from '../models/test';

let tests: Test[] = [
    {
        id: 1,
        title: "Test",
        description: "This is a test",
        completed: false
    },
    {
        id: 2,
        title: "Test 2",
        description: "This is a test 2",
        completed: false
    
    }
];

export const getAll = async (req: Request, res: Response) => {
    res.status(200).json(tests);
}
