import * as React from "react";
import { Link, useParams } from "react-router-dom";
import ChartBarHorizontal from "@/components/charts/bar-chart-horizontal";
import { Arena, arenaService } from "../services/arena";
import { useAppSelector } from "@/store/hooks";
import { selectCompanyId } from "@/store/userSlice";
import LoadingIndicator from "@/components/loadingIndicator/LoadingIndicator";
import { useTranslation } from 'react-i18next';
import { Notification, NotificationType } from "@/components/notification/Notification";
import IdeaWinRateChart from "@/components/charts/idea-win-rate-chart";

const ReturnButton = () => {
    return (
        <Link to="/arenas" className="text-blue-600 hover:underline mb-4 block">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="black" className="w-6 h-6 inline-block align-middle mr-2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
            </svg>
        </Link>
    );
};

const ArenaPage = () => {
    const { t } = useTranslation();
    const { id } = useParams();
    const companyId = useAppSelector(selectCompanyId);
    const [notification, setNotification] = React.useState<{
        id: string,
        notificationType: NotificationType;
        title: string;
        description: string;
        actionText: string;
        onActionClick: () => void;
    }[]>([]);

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
            <ReturnButton />
            {selectedArena && (
                <>
                    <h1 className="text-3xl font-semibold mb-4">
                        {selectedArena.name}
                    </h1>
                    <div className="grid grid-cols-2 gap-4 mb-8"> {/* change grid-cols according to component number */}
                        <div className="p-4 bg-violet-600 rounded-xl shadow-md flex flex-col items-center">
                            <span className="text-3xl font-bold text-white">
                                {selectedArena.total_votes}
                            </span>
                            <span className="text-white">{t("vote_amount")}</span>
                        </div>
                        <div className="p-4 bg-fuchsia-600 rounded-xl shadow-md flex flex-col items-center">
                            <span className="text-3xl font-bold text-white">
                                {selectedArena.total_ideas}
                            </span>
                            <span className="text-white">{t("idea_amount")}</span>
                        </div>
                        {/* Uncomment when data is correct */}
                        {/* <div className="p-4 bg-purple-600 rounded-xl shadow-md flex flex-col items-center">
                            <span className="text-3xl font-bold text-white">
                                {}
                            </span>
                            <span className="text-white">Voter amount</span>
                        </div> */}
                        {/* <div className="p-4 bg-pink-600 rounded-xl shadow-md flex flex-col items-center">
                            <span className="text-3xl font-bold text-white">
                                {selectedArena.overall_win_rate}
                            </span>
                            <span className="text-white">Win rate</span>
                        </div> */}
                    </div>
                    <div>
                        <ChartBarHorizontal ideas={selectedArena.ideas} />
                        <IdeaWinRateChart ideaData={selectedArena.ideas} />
                    </div>
                </>
            )}
            {notification && <Notification notifications={notification} />}
        </div>
    );
};

export default ArenaPage;
