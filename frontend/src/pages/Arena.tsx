import * as React from "react";
import { useParams } from "react-router-dom";
import ChartBarHorizontal from "@/components/charts/bar-chart-horizontal";
import { Arena, arenaService } from "../services/arena";
import { Idea, ideaService } from "../services/ideas";
import { useAppSelector } from "@/store/hooks";
import { selectCompanyId } from "@/store/userSlice";
import LoadingIndicator from "@/components/loadingIndicator/LoadingIndicator";
import { useTranslation } from 'react-i18next';

const ArenaPage = () => {
	const { t } = useTranslation();
	const { id } = useParams();
	const companyId = useAppSelector(selectCompanyId);

	const [selectedArena, setSelectedArena] = React.useState<Arena | null>(
		null
	); // Initialize with null
	const [ideas, setIdeas] = React.useState<ReadonlyArray<Idea>>([]);
	const [voteAmount, setVoteAMount] = React.useState<number | null>(null);

	React.useEffect(() => {
		if (id) {
			arenaService
				.getArenaById(companyId, Number(id))
				.then(setSelectedArena);

			ideaService.getAllIdeas().then((ideas: Idea[]) => {
				const currentArenaIdeas = ideas.filter(
					x => x.arena_id === Number(id)
				);

				let votesForArena = 0;

				currentArenaIdeas.forEach(x => {
					votesForArena += x.vote.length;
				});

				setVoteAMount(votesForArena);

				setIdeas(currentArenaIdeas);
			});
		}
	}, [id]); // Re-fetch data when the id parameter changes

	return (
		<div className="mt-8">
			{selectedArena && (
				<>
					<h1 className="text-3xl font-semibold mb-4">
						{selectedArena.name}
					</h1>
					<div className="grid grid-cols-4 gap-4 mb-8">
						<div className="p-4 bg-violet-800 rounded-xl shadow-md flex flex-col items-center">
							<span className="text-3xl font-bold text-white">
								{voteAmount === null ? (
									<LoadingIndicator />
								) : (
									voteAmount
								)}
							</span>
							<span className="text-white">{t("vote_amount")}</span>
						</div>
						<div className="p-4 bg-fuchsia-800 rounded-xl shadow-md flex flex-col items-center">
							<span className="text-3xl font-bold text-white">
								{selectedArena.total_ideas}
							</span>
							<span className="text-white">{t("idea_amount")}</span>
						</div>
						{/* Uncomment when data is correct */}
						{/* <div className="p-4 bg-purple-800 rounded-xl shadow-md flex flex-col items-center">
							<span className="text-3xl font-bold text-white">
								{}
							</span>
							<span className="text-white">Voter amount</span>
						</div> */}
						{/* <div className="p-4 bg-pink-800 rounded-xl shadow-md flex flex-col items-center">
							<span className="text-3xl font-bold text-white">
								{selectedArena.overall_win_rate}
							</span>
							<span className="text-white">Win rate</span>
						</div> */}
					</div>
					<ChartBarHorizontal ideas={[...ideas]} />
				</>
			)}
		</div>
	);
};

export default ArenaPage;
