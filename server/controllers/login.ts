import { type Request, type Response } from "express";

export const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (email == null || email === '' || password == null || password === '') {
        return res.status(400).json({ message: "Email and password are required" });
    }

    res.status(200).json({ message: "Login successful" });
};
