import React, { useState, useEffect } from "react";
import PlotGraph from "@/components/charts/plot-graph";
import { arenaService, Arena, ArenaIdeaCompareData } from "../services/arena";
import { useAppSelector } from "@/store/hooks";
import { selectCompanyId } from "@/store/userSlice";
import { Notification, NotificationType } from "@/components/notification/Notification";
import { Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import ArenaSelector from "@/components/arena/arena-selector";

const ArenaCompareSelector = () => {
	const companyId = useAppSelector(selectCompanyId);
	const [arenaList1, setArenaList1] = useState<Arena[]>([]);
	const [arenaList2, setArenaList2] = useState<Arena[]>([]);
	const [selectedArena1, setSelectedArena1] = useState<Arena | null>(null);
	const [selectedArena2, setSelectedArena2] = useState<Arena | null>(null);
	const [errorMsg, setErrorMsg] = useState<string | null>(null);
	const [comparisonData, setComparisonData] = useState<ArenaIdeaCompareData[]>([]);

	useEffect(() => {
		fetchArenas();
	}, []);

	const fetchArenas = () => {
		arenaService
			.getArenas(companyId)
			.then(data => {
				setArenaList1(data);
				setErrorMsg(null);
			})
			.catch(error => {
				setErrorMsg(error);
			});
	};

	const onArena1Change = (arenaId: string) => {
		setSelectedArena1(fetchArena(arenaId));
		setSelectedArena2(null);
		setArenaList2([]);
		setComparisonData([]);
		setErrorMsg(null);
		fetchSimilarArenas(arenaId);
	};

	const onArena2Change = (arenaId: string) => {
		setSelectedArena2(fetchArena(arenaId));
		setComparisonData([]);
		setErrorMsg(null);
		if (selectedArena1) {
			getComparisonDetails(parseInt(selectedArena1.id), parseInt(arenaId));
		}
	};

	const fetchSimilarArenas = (arenaId: string) => {
		arenaService
			.getSimilarArenas(companyId, parseInt(arenaId))
			.then(data => {
				setArenaList2(data);
				setErrorMsg(null);
			})
			.catch(error => {
				setErrorMsg(error);
			});
	};

	const getComparisonDetails = (arenaId1: number, arenaId2: number) => {
		arenaService
			.compareArenas(companyId, arenaId1, arenaId2)
			.then(data => {
				setComparisonData(data);
				setErrorMsg(null);
			})
			.catch(error => {
				setErrorMsg(error);
			});
	};

	const fetchArena = (arenaId: string) => {
		const selectedArena = arenaList1.find(arena => arena.id === arenaId);
		return selectedArena || null;
	};

	const notification = [
		{
			notificationType: NotificationType.Error,
			title: 'Error!',
			description: errorMsg || '',
			actionText: 'Retry',
			onActionClick: () => {
				setErrorMsg(null);
				if (selectedArena1 && selectedArena2) {
					getComparisonDetails(parseInt(selectedArena1.id), parseInt(selectedArena2.id));
				}
			}
		}
	];

	return (
		<div className="mt-4 ml-1">
			<div className="flex flex-col space-y-4">
				<div className="flex justify-center">
					<div className="w-1/3 pr-4">
						<ArenaSelector arenas={arenaList1} onChange={onArena1Change} />
					</div>
					<div className="w-1/3 pl-4">
						<ArenaSelector arenas={arenaList2} onChange={onArena2Change} />
					</div>
				</div>
				<div className="mt-2">
					{comparisonData.length > 0 && selectedArena1 && selectedArena2 && <PlotGraph arena1={selectedArena1} arena2={selectedArena2} comparisonData={comparisonData} />}
				</div>
			</div>
			{errorMsg && <Notification notifications={notification} />}
		</div>
	);

};

const Compare = () => {
	const [viewCount, setViewCount] = useState(1);

	const handleAddView = () => {
		setViewCount(prevCount => prevCount + 1);
	};

	const handleRemoveView = () => {
		if (viewCount > 1) {
			setViewCount(prevCount => prevCount - 1);
		}
	};

	return (
		<div className="container mx-auto">
			<div className="fixed top-40 right-4 z-50 flex space-x-2">
				<Button variant="outline" size="icon" onClick={handleAddView}>
					<Plus className="h-4 w-4" />
				</Button>
				<Button variant="outline" size="icon" onClick={handleRemoveView} disabled={viewCount === 1}>
					<Minus className="h-4 w-4" />
				</Button>
			</div>
			<div className="whitespace-nowrap mt-20">
				{[...Array(viewCount)].map((_, index) => (
					<div key={index} className={`inline-block ${index !== 0 ? 'ml-4 mr-4' : ''} ${index !== viewCount - 1 ? 'mr-4 mr-4' : ''}`} style={{ width: "900px" }}>
						<div className="h-full">
							<ArenaCompareSelector key={index} />
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default Compare;
