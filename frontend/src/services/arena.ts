import { AxiosResponse } from "axios";
import axios from "@/lib/axios";

export interface Arena {
    id: number;
    name: string;
    info_text: string;
}

/**
 * Get test data
 * @returns Promise<Test[]>
 */
async function getAllArenas(): Promise<Arena[]> {
    try {
        const response: AxiosResponse = await axios.get(`/arena`);
        return response.data;
    } catch (error) {
        throw error;
    } 
}



export const arenaService = { getAllArenas };