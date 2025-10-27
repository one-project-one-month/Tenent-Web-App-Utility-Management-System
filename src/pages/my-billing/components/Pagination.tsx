import { useMemo } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const CustomPagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  const renderPaginationItems = useMemo(() => {
    const items: React.ReactNode[] = [];
    const maxPagesToShow = 3;

    for (let i = 1; i <= Math.min(maxPagesToShow, totalPages); i++) {
      items.push(
        <PaginationItem key={i}>
          <PaginationLink
            href={`?page=${i}`}
            onClick={(e) => {
              e.preventDefault();
              onPageChange(i);
            }}
            isActive={currentPage === i}
            aria-current={currentPage === i ? "page" : undefined}
            aria-label={`Go to page ${i}`}
            className="transition-all duration-200"
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }

    if (totalPages > maxPagesToShow * 2 + 1) {
      items.push(
        <PaginationItem key="ellipsis">
          <span>...</span>
        </PaginationItem>
      );
    }

    for (
      let i = Math.max(maxPagesToShow + 1, totalPages - maxPagesToShow + 1);
      i <= totalPages;
      i++
    ) {
      items.push(
        <PaginationItem key={i}>
          <PaginationLink
            href={`?page=${i}`}
            onClick={(e) => {
              e.preventDefault();
              onPageChange(i);
            }}
            isActive={currentPage === i}
            aria-current={currentPage === i ? "page" : undefined}
            aria-label={`Go to page ${i}`}
            className="transition-all duration-200"
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }

    return items;
  }, [currentPage, totalPages, onPageChange]);

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={currentPage > 1 ? `?page=${currentPage - 1}` : undefined}
            onClick={(e) => {
              e.preventDefault();
              if (currentPage > 1) onPageChange(currentPage - 1);
            }}
            aria-disabled={currentPage === 1}
            aria-label="Go to previous page"
            className="transition-all duration-200"
          />
        </PaginationItem>
        {renderPaginationItems}
        <PaginationItem>
          <PaginationNext
            href={
              currentPage < totalPages ? `?page=${currentPage + 1}` : undefined
            }
            onClick={(e) => {
              e.preventDefault();
              if (currentPage < totalPages) onPageChange(currentPage + 1);
            }}
            aria-disabled={currentPage === totalPages}
            aria-label="Go to next page"
            className="transition-all duration-200"
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default CustomPagination;
