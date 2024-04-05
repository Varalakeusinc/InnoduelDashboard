import { type Request, type Response } from "express";
import prisma from "../utils/db";
import jwt from "jsonwebtoken";

export const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (email == null || email === '' || password == null || password === '') {
        return res.status(400).json({ message: "Email and password are required" });
    }

    if (process.env.EMAIL !== email || process.env.PASSWORD !== password) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    const user = await prisma.user_info.findUnique({
        where: {
            id: 3
        },
        select: {
            id: true,
            email: true,
            company_id: true,
            user_role_link: true,
            name: true
        }
    });

    if (!user) {
        return res.status(401).json({ message: "User not found" });
    }

    const isAdmin = user.user_role_link.some((role) => role.role_id === 3);
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET as string, {
        expiresIn: '1h',
    });

    res.cookie('token', token, {
        httpOnly: true,
        sameSite: 'strict',
        maxAge: 60 * 60 * 1000 // 1h
    });

    res.status(201).json({ message: "Login successful", user: { email: user.email, companyId: user.company_id, isAdmin, username: user.name } });
};

export const logoutUser = async (req: Request, res: Response) => {
    res.clearCookie('token');
    res.status(200).json({ message: "Logout successful" });
};
