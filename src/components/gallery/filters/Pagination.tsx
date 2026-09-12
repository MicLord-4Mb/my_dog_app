import React, { useMemo } from 'react';
import {
  Pagination as ShadcnPagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from '@/components/ui/pagination';
import { getPageNumbers } from '@/lib/paginationUtils';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalItems: number;
  pageSize: number;
}

const STYLES = {
  container: "w-full flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-secondary-fixed/30 mt-8",
  summaryText: "text-xs sm:text-sm text-on-surface-variant font-medium order-2 sm:order-1",
  boldText: "font-semibold text-on-surface",
  controls: "w-auto mx-0 order-1 sm:order-2",
};

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
  pageSize,
}) => {
  // Generate page numbers with ellipsis using utility memoized
  const pageNumbers = useMemo(() => getPageNumbers(currentPage, totalPages), [currentPage, totalPages]);

  if (totalPages <= 1) return null;

  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  return (
    <div className={STYLES.container}>
      {/* Items count summary */}
      <span className={STYLES.summaryText}>
        Showing <span className={STYLES.boldText}>{startItem}–{endItem}</span> of{' '}
        <span className={STYLES.boldText}>{totalItems}</span> breeds
      </span>

      {/* Pagination controls */}
      <ShadcnPagination className={STYLES.controls}>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              disabled={currentPage <= 1}
              onClick={() => onPageChange(currentPage - 1)}
            />
          </PaginationItem>

          {pageNumbers.map((page, idx) => (
            <PaginationItem key={`page-${idx}-${page}`}>
              {typeof page === 'string' ? (
                <PaginationEllipsis />
              ) : (
                <PaginationLink
                  isActive={page === currentPage}
                  onClick={() => onPageChange(page)}
                >
                  {page}
                </PaginationLink>
              )}
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationNext
              disabled={currentPage >= totalPages}
              onClick={() => onPageChange(currentPage + 1)}
            />
          </PaginationItem>
        </PaginationContent>
      </ShadcnPagination>
    </div>
  );
};
