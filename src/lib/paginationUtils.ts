/**
 * Generates an array of page numbers for pagination controls, including ellipsis.
 * 
 * @param currentPage - The current active page.
 * @param totalPages - The total number of pages.
 * @param maxButtons - Maximum number of visible page buttons before using ellipsis.
 * @returns Array of page numbers and '...' strings.
 */
export const getPageNumbers = (currentPage: number, totalPages: number, maxButtons = 5): (number | string)[] => {
  const pages: (number | string)[] = [];

  if (totalPages <= maxButtons) {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
  } else {
    if (currentPage <= 3) {
      pages.push(1, 2, 3, 4, '...', totalPages);
    } else if (currentPage >= totalPages - 2) {
      pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
    } else {
      pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
    }
  }

  return pages;
};
