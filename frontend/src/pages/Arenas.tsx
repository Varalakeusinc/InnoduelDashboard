import React, { useEffect } from "react";
import { Arena, arenaService } from "../services/arena";
import { Link } from "react-router-dom";
import { useAppSelector } from "@/store/hooks";
import { selectCompanyId } from "@/store/userSlice";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

const Arenas = () => {
    const [arenas, setArenas] = React.useState<Arena[]>([]);
    const [currentPage, setCurrentPage] = React.useState(1);
    const arenasPerPage = 12; // Number of arenas to display per page
    const maxPageNumbers = 100; // Maximum number of page numbers to show

    // Use this to fetch all arenas for specific company
    const companyId = useAppSelector(selectCompanyId);

    // Fetch arenas for the selected company
    useEffect(() => {
        setCurrentPage(1); // Reset current page when changing companies
        arenaService.getArenas(companyId).then(setArenas);
    }, [companyId]);

    const indexOfLastArena = currentPage * arenasPerPage;
    const indexOfFirstArena = indexOfLastArena - arenasPerPage;
    // Slice the arenas array to display only the arenas for the current page
    const currentArenas = arenas.slice(indexOfFirstArena, indexOfLastArena);

    // Change page
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    // Calculate total number of pages
    const totalPages = Math.ceil(arenas.length / arenasPerPage);

    // Calculate range of pages to display in pagination
    const getPageButtonClassName = (pageNumber: number) => {
        if (currentPage === pageNumber) {
            return "bg-cyan-300 hover:bg-cyan-400";
        } else {
            return "bg-gray-100 hover:bg-cyan-300";
        }
    };

    const pageNumbers = [];
    let startPage = 1;
    let endPage = totalPages;

    if (totalPages > maxPageNumbers) {
        const halfMaxPageNumbers = Math.floor(maxPageNumbers / 2);
        if (currentPage <= halfMaxPageNumbers) {
            endPage = maxPageNumbers;
        } else if (currentPage >= totalPages - halfMaxPageNumbers) {
            startPage = totalPages - maxPageNumbers + 1;
        } else {
            startPage = currentPage - halfMaxPageNumbers;
            endPage = currentPage + halfMaxPageNumbers;
        }
    }

    for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="mx-auto container">
            {/* Pagination */}
            {totalPages > 1 && (
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
                        disabled={currentPage === totalPages}
                        className="bg-gray-100 hover:bg-cyan-300 text-gray-700 font-bold py-2 px-4 rounded-r"
                        aria-label="Next page"
                    >
                        <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
                    </button>
                </div>
            )}
            <div style={{ height: "20px" }} aria-hidden="true"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-y-10 gap-x-4 max-w-screen-xl">
                {currentArenas.map(arena => (
                    <Link
                        key={arena.id}
                        to={`/arena/${arena.id}`}
                        className="block focus:outline-none"
                        aria-label={`Navigate to ${arena.name}`}
                    >
                        <div className="p-4 bg-orange-300 rounded-lg hover:bg-orange-400 max-w-sm shadow-lg transition duration-300 ease-in-out transform hover:scale-105 focus:ring-2 focus:ring-orange-500">
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 overflow-hidden whitespace-normal break-words">
                                {arena.name}
                            </h5>
                            <p className="mb-3 font-normal text-gray-700 overflow-hidden whitespace-normal break-words">
                                {!!arena.info_text && arena.info_text}
                            </p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Arenas;
