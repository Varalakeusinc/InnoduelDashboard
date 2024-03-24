import React from "react";
import { CartesianGrid, Legend, Scatter, ScatterChart, Tooltip, XAxis, YAxis, LabelList } from "recharts";
import { ArenaIdeaCompareData } from "../../src/services/arena";


interface ComparisonPlotGraphProps {
  comparisonData: ArenaIdeaCompareData[];
}

const ComparisonPlotGraph: React.FC<ComparisonPlotGraphProps> = ({ comparisonData }) => {
  const numberedData = comparisonData.map((data, index) => ({
    ...data,
    idea_number: index + 1
  }));

  return (
    <div className="relative">
      <div className="flex justify-end">
        <div className="flex-grow">
          <ScatterChart
            width={800}
            height={400}
            margin={{
              top: 20,
              right: 20,
              bottom: 20,
              left: 20,
            }}
            className="ml-auto"
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" dataKey="arena1_winRate" name="Arena 1" domain={[0, 1]} label={{ value: 'Arena 1', position: 'insideBottom', dy: 20 }} />
            <YAxis type="number" dataKey="arena2_winRate" name="Arena 2" domain={[0, 1]} label={{ value: 'Arena 2', position: 'insideLeft', angle: -90, dy: -10 }} />
            <Tooltip cursor={{ strokeDasharray: '3 3' }} content={<CustomTooltip />} />
            <Legend verticalAlign="top" align="left" layout="vertical" wrapperStyle={{ top: 30, left: -100 }} />
            <Scatter name="Overall Win Rate" data={numberedData} fill="#8884d8">
              <LabelList dataKey="idea_number" position="top" />
            </Scatter>
          </ScatterChart>
        </div>
        <div className="absolute top-0 left-0 mt-20 max-w-md overflow-hidden z-10">
          <ul className="whitespace-normal max-w-full" style={{ maxWidth: "200px" }}>
            {numberedData.map((data) => (
              <li key={data.idea_text}>{data.idea_number}: {data.idea_text}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

const CustomTooltip: React.FC<any> = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white border border-gray-300 p-4 rounded">
        <p className="recharts-tooltip-label font-bold break-words text-sm">{data.idea_text}</p>
        <p className="recharts-tooltip-label text-sm">Arena 1 : {data.arena1_winRate}</p>
        <p className="recharts-tooltip-label text-sm">Arena 2 : {data.arena2_winRate}</p>
      </div>
    );
  }

  return null;
};

export default ComparisonPlotGraph;
