import { AxiosResponse } from "axios";
import axios from "../lib/axios";

const getTestData = async () => {
    try {
        const response: AxiosResponse = await axios.get(`/test`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

export const testService = { getTestData };