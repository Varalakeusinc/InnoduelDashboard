import * as React from "react";
import Chart from "chart.js/auto";
import { Idea } from "@/src/services/ideas";
import { useTranslation } from 'react-i18next';

type ChartBarHorizontalProps = {
    ideas: Idea[];
};

export const sortIdeasByVotesDescending = (ideas: Idea[]): Idea[] => {
    return [...ideas].sort((a, b) => b.vote_count - a.vote_count);
};

const ChartBarHorizontal: React.FC<ChartBarHorizontalProps> = ({ ideas }) => {
    const chartRef = React.useRef<HTMLCanvasElement>(null);
	const { t } = useTranslation();

    React.useEffect(() => {
        if (chartRef && chartRef.current) {
            const sortedIdeas = [...ideas].sort(
                (a, b) => b.vote_count - a.vote_count
            ); // Sort ideas by votes in descending order

            const data = sortedIdeas.map(idea => idea.vote_count);
            const labels = sortedIdeas.map(idea => {
                const truncatedLabel = idea.idea_text.length > 50 ? idea.idea_text.substring(0, 50) + '...' : idea.idea_text;
                return truncatedLabel;
            });

            const chartConfig = {
                type: "bar",
                data: {
                    labels: labels,
                    datasets: [
                        {
                            label: t("votes"),
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
                            text: t("votes_by_idea"),
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
                                title: function () {
                                    return '';
                                },
                                label: function (context: any) {
                                    const label = sortedIdeas[context.dataIndex].idea_text;
                                    const value = context.dataset.data[context.dataIndex];
                                    if (value !== null) {
                                        return label + ": " + value;
                                    }
                                    return "";
                                },
                            },
                            padding: 18,
                            bodyFont: {
                                size: 18,
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
                                stepSize: 1,
                            },
                        },
                        y: {
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

    return <canvas ref={chartRef} data-testid="bar-chart"/>;
};

export default ChartBarHorizontal;
