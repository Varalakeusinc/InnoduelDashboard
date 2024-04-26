import React from "react";
import {
	CartesianGrid,
	Legend,
	Scatter,
	ScatterChart,
	Tooltip,
	XAxis,
	YAxis,
	LabelList,
} from "recharts";
import { ArenaIdeaCompareData } from "../../src/services/arena";
import { Arena } from "../../src/services/arena";

interface ComparisonPlotGraphProps {
	comparisonData: ArenaIdeaCompareData[];
	arena1: Arena;
	arena2: Arena;
	plotColor: string;
}

const ComparisonPlotGraph: React.FC<ComparisonPlotGraphProps> = ({
	comparisonData,
	arena1,
	arena2,
	plotColor,
}) => {
	const numberedData = comparisonData.map((data, index) => ({
		...data,
		idea_number: index + 1,
	}));

	return (
		<div className="relative">
			<div className="flex flex-row md:flex-row justify-end">
				<div className="flex-grow">
					<ScatterChart
						width={800}
						height={500}
						margin={{
							top: 20,
							right: 20,
							bottom: 20,
							left: 0,
						}}
						className="ml-auto"
					>
						<CartesianGrid strokeDasharray="3 3" />
						<XAxis
							type="number"
							dataKey="arena1_winRate"
							name={arena1.name}
							domain={[0, 1]}
							label={{
								value: arena1.name,
								position: "insideBottom",
								dy: 20,
							}}
						/>
						<YAxis
							type="number"
							dataKey="arena2_winRate"
							name={arena2.name}
							domain={[0, 1]}
							label={{
								value: arena2.name,
								position: "insideLeft",
								angle: -90,
							}}
						/>
						<Tooltip
							cursor={{ strokeDasharray: "3 3" }}
							content={
								<CustomTooltip
									arena1={arena1}
									arena2={arena2}
								/>
							}
						/>
						<Legend
							verticalAlign="top"
							align="left"
							layout="vertical"
							wrapperStyle={{ top: 30, left: -100 }}
						/>
						<Scatter
							name="Overall Win Rate"
							data={numberedData}
							fill={plotColor}
						>
							<LabelList dataKey="idea_number" position="top" />
						</Scatter>
					</ScatterChart>
				</div>
				<div className="absolute top-0 left-0 mt-20 max-w-md overflow-hidden z-10">
					<ul
						className="whitespace-normal max-w-full"
						style={{ maxWidth: "200px" }}
					>
						{numberedData.map(data => (
							<li key={data.idea_text}>
								{data.idea_number}: {data.idea_text}
							</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	);
};

const CustomTooltip: React.FC<any> = ({ active, payload, arena1, arena2 }) => {
	if (active && payload && payload.length && arena1 && arena2) {
		const data = payload[0].payload;
		return (
			<div className="bg-white border border-gray-300 p-4 rounded">
				<p className="recharts-tooltip-label font-bold break-words text-sm">
					{data.idea_text}
				</p>
				<p className="recharts-tooltip-label text-sm">
					{arena1.name} : {data.arena1_winRate}
				</p>
				<p className="recharts-tooltip-label text-sm">
					{arena2.name} : {data.arena2_winRate}
				</p>
			</div>
		);
	}

	return null;
};

export default ComparisonPlotGraph;
