import { AxiosResponse } from "axios";
import axios from "@/lib/axios";

export interface Idea {
    id: string;
    name: string;
    votes: number;
}

export interface Arena {
    id: string;
    name: string;
    ideas: Idea[];
    totalVotes: number;
    winRate: number;
}

// Mock data for testing
export const mockArenas: Arena[] = [
    {
        id: 'arena-1',
        name: 'Innovation Challenge',
        ideas: [
            { id: 'idea-1', name: 'Recycling Program', votes: 150 },
            { id: 'idea-2', name: 'Gardening Project', votes: 120 },
            { id: 'idea-3', name: 'Community Project', votes: 20 },
        ],
        totalVotes: 290,
        winRate: 51.7,
    },
    {
        id: 'arena-2',
        name: 'Tech Sprint',
        ideas: [
            { id: 'idea-4', name: 'AI Assistant', votes: 180 },
            { id: 'idea-5', name: 'AR Tool', votes: 160 },
        ],
        totalVotes: 340,
        winRate: 52.9,
    },
    {
        id: 'arena-3',
        name: 'Test card',
        ideas: [
            { id: 'idea-6', name: 'test text', votes: 281 },
            { id: 'idea-7', name: 'test text 2', votes: 16 },
            { id: 'idea-8', name: 'test text 3', votes: 50 },
            { id: 'idea-9', name: 'test text 4', votes: 61 },
            { id: 'idea-10', name: 'test text 5', votes: 42 },
        ],
        totalVotes: 450,
        winRate: 60.0,
    },
   
];

// Function to get all arenas - using mock data for now
async function getAllMockArenas(): Promise<Arena[]> {
    // Comment this out to use mock data instead of an actual API call
    // try {
    //     const response: AxiosResponse = await axios.get(`/arena`);
    //     return response.data;
    // } catch (error) {
    //     throw error;
    // }
    
    // Return mock data for testing purposes
    return Promise.resolve(mockArenas);
}

async function getAllArenas(): Promise<Arena[]> {
    try {
        const response: AxiosResponse = await axios.get(`/arena`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const arenaService = { getAllMockArenas, getAllArenas };