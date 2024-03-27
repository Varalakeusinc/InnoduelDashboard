import * as React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';
import { Idea } from "@/src/services/ideas";

interface IdeaWinRateChartProps {
    ideaData: Idea[];
}

const IdeaWinRateChart: React.FC<IdeaWinRateChartProps> = ({ ideaData }) => {

    const maxLabelLength = React.useMemo(() => {
        return Math.max(...ideaData.map(idea => idea.idea_text.length));
    }, [ideaData]);

    if (ideaData.length === 0) {
        return null;
    }
    
    return (
        <ResponsiveContainer width="100%" height={600}>
            <BarChart data={ideaData} margin={{ top: 50, right: 30, left: (50 + maxLabelLength), bottom: (30 +(maxLabelLength * 4)) }}>
                <CartesianGrid strokeDasharray="3 3" />
                <YAxis type="number" label={{ value: "Win Rate (%)", angle: -90, dx: -35 }} tickFormatter={(tick) => `${tick}%`} domain={[0, 100]} />
                <XAxis type="category" dataKey="idea_text" angle={-45} textAnchor="end" interval={0} tick={{ fontSize: 12 }} />
                <Tooltip formatter={(value: any) => [`Win Rate (%): ${value}%`]} />
                <Bar dataKey="win_rate" fill="#8884d8" />
            </BarChart>
        </ResponsiveContainer>
    );
};

export default IdeaWinRateChart;