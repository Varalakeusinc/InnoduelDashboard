import React from "react";
import { MockIdea } from "@/src/services/arena";

interface IdeasListProps {
	ideas: MockIdea[];
}

const IdeasList: React.FC<IdeasListProps> = ({ ideas }) => {
	return (
		<ul className="list-disc pl-5">
			{ideas.map(idea => (
				<li key={idea.id} className="mt-1">
					<span className="font-semibold">{idea.name}:</span>{" "}
					{idea.votes} votes
				</li>
			))}
		</ul>
	);
};

export default IdeasList;
