import * as React from "react";
import { useParams } from "react-router-dom";
import ChartBarHorizontal from "@/components/charts/bar-chart-horizontal";
import { Arena, arenaService } from "../services/arena";
import { useAppSelector } from "@/store/hooks";
import { selectCompanyId } from "@/store/userSlice";
import { Notification, NotificationType } from "@/components/notification/Notification";
import IdeaWinRateChart from "@/components/charts/idea-win-rate-chart";

const ArenaPage = () => {
	const { id } = useParams();
	const companyId = useAppSelector(selectCompanyId);
	const [notification, setNotification] = React.useState<{ id: string, notificationType: NotificationType; title: string; description: string; actionText: string; onActionClick: () => void; }[]>([]);

	const [selectedArena, setSelectedArena] = React.useState<Arena | null>(
		null
	); // Initialize with null

	React.useEffect(() => {
		if (id) {
			fetchArenaDetails(id);
		}
	}, [id]); // Re-fetch data when the id parameter changes

	const fetchArenaDetails = (arenaId: string) => {
		arenaService
			.getArenaById(companyId, Number(arenaId))
			.then(data => {
				setSelectedArena(data);
				setNotification([]);
			})
			.catch(error => {
				handleNotification(error);
			});
	};

	const handleNotification = (errorMsg: string) => {
		setNotification([{
			id: new Date().getTime().toString(),
			notificationType: NotificationType.Error,
			title: 'Error!',
			description: errorMsg || '',
			actionText: 'Retry',
			onActionClick: () => {
				if (id) {
					fetchArenaDetails(id);
				}
				setNotification([]);
			}
		}])
	};

	return (
		<div className="mt-8">
			{selectedArena && (
				<>
					<h1 className="text-3xl font-semibold mb-4">
						{selectedArena.name}
					</h1>
					<div className="grid grid-cols-2 gap-4 mb-8"> {/* change grid-cols according to component number */}
						<div className="p-4 bg-violet-800 rounded-xl shadow-md flex flex-col items-center">
							<span className="text-3xl font-bold text-white">
								{selectedArena.total_votes}
							</span>
							<span className="text-white">Vote amount</span>
						</div>
						<div className="p-4 bg-fuchsia-800 rounded-xl shadow-md flex flex-col items-center">
							<span className="text-3xl font-bold text-white">
								{selectedArena.total_ideas}
							</span>
							<span className="text-white">Idea amount</span>
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
					<ChartBarHorizontal ideas={selectedArena.ideas} />
					<IdeaWinRateChart ideaData={selectedArena.ideas} />
				</>
			)}
			{notification && <Notification notifications={notification} />}
		</div>
	);
};

export default ArenaPage;
