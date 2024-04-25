export const calculatePageRange = (currentPage: any, totalPages: any, maxPageNumbers: any) => {
    let startPage = 1;
    let endPage = totalPages;

    const halfMaxPageNumbers = Math.floor(maxPageNumbers / 2);
    if (totalPages > maxPageNumbers) {
        if (currentPage <= halfMaxPageNumbers) {
            endPage = maxPageNumbers;
        } else if (currentPage >= totalPages - halfMaxPageNumbers) {
            startPage = totalPages - maxPageNumbers + 1;
        } else {
            startPage = currentPage - halfMaxPageNumbers;
            endPage = currentPage + halfMaxPageNumbers;
        }
    }
    return { startPage, endPage };
};