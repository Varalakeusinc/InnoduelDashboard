import { Router, Request, Response } from 'express';
import { Test } from '../models/test';

const router = Router();
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

router.get('/', (req: Request, res: Response) => {
    res.status(200).json(tests);
});

export default router;