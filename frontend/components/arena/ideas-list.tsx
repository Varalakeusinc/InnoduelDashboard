import React from "react";
import { Idea } from "@/src/services/ideas";

interface IdeasListProps {
	ideas: Idea[];
}

const IdeasList: React.FC<IdeasListProps> = ({ ideas }) => {
	return (
		<ul className="list-disc pl-5">
			{ideas.map(idea => (
				<li key={idea.id} className="mt-1">
					<span className="font-semibold">{idea.idea_text}:</span>{" "}
					{idea.vote_count} votes
				</li>
			))}
		</ul>
	);
};

export default IdeasList;
