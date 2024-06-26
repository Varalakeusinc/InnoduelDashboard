import React from "react";
import { Arena } from "@/src/services/arena";
import IdeasList from "./ideas-list";
import VotesBarChart from "../charts/bar-chart";

interface ArenaCardProps {
	arena: Arena;
}

const ArenaCard: React.FC<ArenaCardProps> = ({ arena }) => {
	return (
		<div //
			className="bg-white shadow rounded-lg p-4 mb-4"
			style={{ backgroundColor: "seashell" }}
		>
			<h3 className="text-xl font-bold mb-2">{arena.name}</h3>
			<p>Total Votes: {arena.total_votes}</p>
			<p>Win Rate: {arena.overall_win_rate}</p>
			<IdeasList ideas={arena.ideas} />

			{/* Votes Bar Chart */}
			<div className="mt-4">
				<VotesBarChart ideas={arena.ideas} />
			</div>
		</div>
	);
};

export default ArenaCard;
