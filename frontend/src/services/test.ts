import { AxiosResponse } from "axios";
import axios from "@/lib/axios";
import { Test } from "../pages/test";

/**
 * Get test data
 * @returns Promise<Test[]>
 */
async function getTestData(): Promise<Test[]> {
    try {
        const response: AxiosResponse = await axios.get(`/test`);
        return response.data;
    } catch (error) {
        throw error;
    } 
}

async function getTestDataById(id: number): Promise<Test> {
    try {
        const response: AxiosResponse = await axios.get(`/test/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    } 
}

export const testService = { getTestData, getTestDataById };