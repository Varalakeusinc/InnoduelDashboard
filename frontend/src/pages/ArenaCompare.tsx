import { useState, useEffect } from "react";
import PlotGraph from "@/components/charts/plot-graph";
import { arenaService, Arena, ArenaIdeaCompareData } from "../services/arena";
import { useAppSelector } from "@/store/hooks";
import { selectCompanyId } from "@/store/userSlice";
import {
	Notification,
	NotificationType,
} from "@/components/notification/Notification";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import ArenaSelector from "@/components/arena/arena-selector";

const ArenaCompare = ({
	onClose,
	isCloseDisabled,
}: {
	onClose: () => void;
	isCloseDisabled: boolean;
}) => {
	const companyId = useAppSelector(selectCompanyId);
	const [arenaList1, setArenaList1] = useState<Arena[]>([]);
	const [arenaList2, setArenaList2] = useState<Arena[]>([]);
	const [selectedArena1, setSelectedArena1] = useState<Arena | null>(null);
	const [selectedArena2, setSelectedArena2] = useState<Arena | null>(null);
	const [comparisonData, setComparisonData] = useState<
		ArenaIdeaCompareData[]
	>([]);
	const [plotColor, setPlotColor] = useState<string>("");
	const [notification, setNotification] = useState<
		{
			id: string;
			notificationType: NotificationType;
			title: string;
			description: string;
			actionText: string;
			onActionClick: () => void;
		}[]
	>([]);

	useEffect(() => {
		fetchArenas();
		setPlotColor(getRandomColor());
	}, []);

	const fetchArenas = () => {
		arenaService
			.getArenas(companyId)
			.then(data => {
				setArenaList1(data);
				setNotification([]);
			})
			.catch(error => {
				handleNotification(error);
			});
	};

	const onArena1Change = (arenaId: string) => {
		setSelectedArena1(fetchArena(arenaId));
		setSelectedArena2(null);
		setArenaList2([]);
		setComparisonData([]);
		setNotification([]);
		fetchSimilarArenas(arenaId);
	};

	const onArena2Change = (arenaId: string) => {
		setSelectedArena2(fetchArena(arenaId));
		setComparisonData([]);
		setNotification([]);
		if (selectedArena1) {
			getComparisonDetails(
				parseInt(selectedArena1.id),
				parseInt(arenaId)
			);
		}
	};

	const fetchSimilarArenas = (arenaId: string) => {
		arenaService
			.getSimilarArenas(companyId, parseInt(arenaId))
			.then(data => {
				setArenaList2(data);
				setNotification([]);
			})
			.catch(error => {
				handleNotification(error);
			});
	};

	const getComparisonDetails = (arenaId1: number, arenaId2: number) => {
		arenaService
			.compareArenas(companyId, arenaId1, arenaId2)
			.then(data => {
				setComparisonData(data);
				setNotification([]);
			})
			.catch(error => {
				handleNotification(error);
			});
	};

	const fetchArena = (arenaId: string) => {
		const selectedArena = arenaList1.find(arena => arena.id === arenaId);
		return selectedArena || null;
	};

	const getRandomColor = () => {
		return "#" + Math.floor(Math.random() * 16777215).toString(16);
	};

	const handleNotification = (errorMsg: string) => {
		setNotification([
			{
				id: new Date().getTime().toString(),
				notificationType: NotificationType.Error,
				title: "Error!",
				description: errorMsg || "",
				actionText: "Retry",
				onActionClick: () => {
					if (!arenaList1 || arenaList1.length === 0) {
						fetchArenas();
					} else if (!arenaList2 || arenaList2.length === 0) {
						if (selectedArena1) {
							fetchSimilarArenas(selectedArena1.id);
						}
					} else if (selectedArena1 && selectedArena2) {
						getComparisonDetails(
							parseInt(selectedArena1.id),
							parseInt(selectedArena2.id)
						);
					}
					setNotification([]);
				},
			},
		]);
	};

	return (
		<div className="mt-4 ml-1">
			<div className="flex flex-col space-y-4">
				<div className="flex justify-center md:flex-row flex-col gap-4">
					<div className="md:w-1/3 w-36">
						<ArenaSelector
							arenas={arenaList1}
							onChange={onArena1Change}
						/>
					</div>
					<div className="md:w-1/3 w-36">
						<ArenaSelector
							arenas={arenaList2}
							onChange={onArena2Change}
						/>
					</div>
					<div className="md:w-1/3 w-36">
						{!isCloseDisabled && (
							<Button
								variant="outline"
								size="icon"
								onClick={() => onClose()}
								disabled={isCloseDisabled}
							>
								<X className="h-4 w-4" />
							</Button>
						)}
					</div>
				</div>
				<div className="mt-2">
					{comparisonData.length > 0 &&
						selectedArena1 &&
						selectedArena2 && (
							<PlotGraph
								arena1={selectedArena1}
								arena2={selectedArena2}
								comparisonData={comparisonData}
								plotColor={plotColor}
							/>
						)}
				</div>
			</div>
			{notification && <Notification notifications={notification} />}
		</div>
	);
};

export default ArenaCompare;
