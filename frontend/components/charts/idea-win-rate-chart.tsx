import * as React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';
import { Idea } from "@/src/services/ideas";

// Define the sortIdeasByWinRate function
export function sortIdeasByWinRate(ideaData: Idea[]) {
    return [...ideaData].sort((a, b) => (b.win_rate ?? 0) - (a.win_rate ?? 0));
}

// Define the calculateMaxLabelLength function
export function calculateMaxLabelLength(ideaData: Idea[]) {
    const sortedIdeaData = sortIdeasByWinRate(ideaData);
    return Math.min(Math.max(...sortedIdeaData.map(idea => idea.idea_text.length)), 50);
}

interface IdeaWinRateChartProps {
    ideaData: Idea[];
}

export const IdeaWinRateChart: React.FC<IdeaWinRateChartProps> = ({ ideaData }) => {
    const sortedIdeaData = sortIdeasByWinRate(ideaData);
    const maxLabelLength = calculateMaxLabelLength(sortedIdeaData);

    if (sortedIdeaData.length === 0) {
        return null;
    }

    return (
        <ResponsiveContainer width="100%" height={600 + maxLabelLength} data-testid="win-rate-chart">
            <BarChart data={sortedIdeaData} margin={{ top: 50, right: 30, left: 50, bottom: 20 + (maxLabelLength * 4) }}>
                <CartesianGrid strokeDasharray="3 3" />
                <YAxis type="number" label={{ value: "Win Rate (%)", angle: -90, dx: -35 }} tickFormatter={(tick) => `${tick}%`} domain={[0, 100]} />
                <XAxis type="category" dataKey="idea_text" angle={-45} textAnchor="end" interval={0} tick={{ fontSize: 12 }} tickFormatter={(label) => label.length > 50 ? `${label.substring(0, 50)}...` : label} />
                <Tooltip formatter={(value: any) => [`Win Rate (%): ${value}%`]} />
                <Bar dataKey="win_rate" fill="#8884d8" />
            </BarChart>
        </ResponsiveContainer>
    );
};

export default IdeaWinRateChart;
