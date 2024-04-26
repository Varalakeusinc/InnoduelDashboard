import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useAppSelector } from "@/store/hooks";
import { selectCompanyId } from "@/store/userSlice";
import { arenaService, Arena } from "../services/arena";
import {Notification, NotificationType} from "@/components/notification/Notification";

const Arenas = () => {
    const [arenas, setArenas] = useState<Arena[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const arenasPerPage = 12; // Number of arenas to display per page
    const maxPageNumbers = 100; // Maximum number of page numbers to show
    const companyId = useAppSelector(selectCompanyId);
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
        const fetchArenas = async () => {
            const response = await fetch(`/api/arenas/${companyId}`);
            const data = await response.json();
            setArenas(data);
        };
    
        setCurrentPage(1);
        fetchArenas();
    }, [companyId]);

    const fetchArenas = () => {
        arenaService.getArenas(companyId)
            .then(data => {
                setArenas(data);
                setNotification([]);
            })
            .catch(error => {
                handleNotification(error);
            });
    };

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    const getPageButtonClassName = (pageNumber: number) => {
        if (currentPage === pageNumber) {
            return "bg-cyan-300 hover:bg-cyan-400";
        } else {
            return "bg-gray-100 hover:bg-cyan-300";
        }
    };

    const pageNumbers = [];
    let startPage = 1;
    let endPage = Math.ceil(arenas.length / arenasPerPage);

    if (endPage > maxPageNumbers) {
        const halfMaxPageNumbers = Math.floor(maxPageNumbers / 2);
        if (currentPage <= halfMaxPageNumbers) {
            endPage = maxPageNumbers;
        } else if (currentPage >= endPage - halfMaxPageNumbers) {
            startPage = endPage - maxPageNumbers + 1;
        } else {
            startPage = currentPage - halfMaxPageNumbers;
            endPage = currentPage + halfMaxPageNumbers;
        }
    }

    for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
    }

    const handleNotification = (errorMsg: string) => {
        setNotification([
            {
                id: new Date().getTime().toString(),
                notificationType: NotificationType.Error,
                title: "Error!",
                description: errorMsg || "",
                actionText: "Retry",
                onActionClick: () => {
                    fetchArenas();
                    setNotification([]);
                },
            },
        ]);
    };

    return (
        <div className="mx-auto container">
            {pageNumbers.length > 1 && (
                <div className="flex justify-center mt-4">
                    <button
                        onClick={() => paginate(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="bg-gray-100 hover:bg-cyan-300 text-gray-700 font-bold py-2 px-4 rounded-l"
                        aria-label="Previous page"
                    >
                        <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" />
                    </button>
                    {pageNumbers.map(pageNumber => (
                        <button
                            key={pageNumber}
                            onClick={() => paginate(pageNumber)}
                            className={`py-2 px-4 ${getPageButtonClassName(pageNumber)} text-gray-700 font-bold rounded`}
                            aria-label={`Go to page ${pageNumber}`}
                        >
                            {pageNumber}
                        </button>
                    ))}
                    <button
                        onClick={() => paginate(currentPage + 1)}
                        disabled={currentPage === endPage}
                        className="bg-gray-100 hover:bg-cyan-300 text-gray-700 font-bold py-2 px-4 rounded-r"
                        aria-label="Next page"
                    >
                        <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
                    </button>
                </div>
            )}
            <div style={{ height: "35px" }} aria-hidden="true"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-y-10 gap-x-4 max-w-screen-xl mx-auto">
                {arenas.slice((currentPage - 1) * arenasPerPage, currentPage * arenasPerPage).map(arena => (
                    <Link
                        key={arena.id}
                        to={`/arena/${arena.id}`}
                        className="block focus:outline-none"
                        aria-label={`Navigate to ${arena.name}`}
                    >
                        <div className="p-4 bg-orange-300 rounded-lg hover:bg-orange-400 shadow-lg transition duration-300 ease-in-out transform hover:scale-105 focus:ring-2 focus:ring-orange-500">
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 overflow-hidden whitespace-normal break-words">
                                {arena.name}
                            </h5>
                            <p className="mb-3 font-normal text-gray-700 overflow-hidden whitespace-normal break-words">
                                {!!arena.info_text && arena.info_text}
                            </p>
                        </div>
                    </Link>
                ))}
                <div style={{ marginBottom: "5px" }} aria-hidden="true"></div>
            </div>
            {notification && <Notification notifications={notification} />}
        </div>
    );
};

export default Arenas;
