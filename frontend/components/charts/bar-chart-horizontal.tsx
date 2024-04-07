import * as React from "react";
import Chart from "chart.js/auto";
import { Idea } from "@/src/services/ideas";

type ChartBarHorizontalProps = {
	ideas: Idea[];
};

const ChartBarHorizontal: React.FC<ChartBarHorizontalProps> = ({ ideas }) => {
	const chartRef = React.useRef<HTMLCanvasElement>(null);

	React.useEffect(() => {
		if (chartRef && chartRef.current) {
			const sortedIdeas = [...ideas].sort(
				(a, b) => b.vote.length - a.vote.length
			); // Sort ideas by votes in descending order

			const data = sortedIdeas.map(idea => idea.vote.length);
			const labels = sortedIdeas.map(idea => idea.idea_text);

			const chartConfig = {
				type: "bar",
				data: {
					labels: labels,
					datasets: [
						{
							label: "Votes",
							data: data,
							backgroundColor: "#4371CD",
							hoverBackgroundColor: "#185592",
						},
					],
				},
				options: {
					indexAxis: "y",
					plugins: {
						title: {
							display: true,
							text: "Votes by Idea",
							font: {
								size: 18,
							},
							padding: {
								top: 10,
								bottom: 10,
							},
						},
						tooltip: {
							callbacks: {
								label: function (context: any) {
									const label =
										sortedIdeas[context.dataIndex]
											.idea_text;
									const value =
										context.dataset.data[context.dataIndex];
									if (value !== null) {
										return label + ": " + value;
									}
									return "";
								},
							},
						},
					},
					scales: {
						x: {
							stacked: true,
							display: true,
							grid: {
								display: true,
								borderDash: [2],
								zeroLineColor: "rgba(0,0,0,0)",
								zeroLineBorderDash: [2],
								zeroLineBorderDashOffset: [2],
							},
							ticks: {
								color: "rgba(0,0,0, 0.5)",
							},
						},
						y: {
							display: false, 
							stacked: true,
							grid: {
								display: false,
							},
							ticks: {
								color: "rgba(0,0,0, 0.5)",
							},
						},
					},
				},
			};

			const chartInstance = new Chart(
				chartRef.current,
				chartConfig as any
			);

			return () => {
				chartInstance.destroy();
			};
		}
	}, [ideas]); // Re-render chart when arena changes

	return <canvas ref={chartRef} />;
};

export default ChartBarHorizontal;
