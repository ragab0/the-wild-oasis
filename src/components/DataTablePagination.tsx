import { useSearchParams } from "react-router-dom";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface DataTablePaginationProps {
  pageCount: number;
}

export function DataTablePagination({ pageCount }: DataTablePaginationProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const handlePageChange = (page: number) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("page", page.toString());
    setSearchParams(newParams);
  };

  // Calculate page numbers to show
  const getPageNumbers = () => {
    const delta = 2; // Number of pages to show on each side of current page
    const pages: (number | "ellipsis")[] = [];

    for (let i = 1; i <= pageCount; i++) {
      if (
        i === 1 || // Always show first page
        i === pageCount || // Always show last page
        (i >= currentPage - delta && i <= currentPage + delta) // Show pages around current page
      ) {
        pages.push(i);
      } else if (
        i === currentPage - delta - 1 ||
        i === currentPage + delta + 1
      ) {
        pages.push("ellipsis");
      }
    }

    return pages;
  };

  if (pageCount <= 1) return null;

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
            className={
              currentPage <= 1
                ? "pointer-events-none opacity-50"
                : "cursor-pointer"
            }
          />
        </PaginationItem>

        {getPageNumbers().map((pageNumber, index) =>
          pageNumber === "ellipsis" ? (
            <PaginationItem key={`ellipsis-${index}`}>
              <PaginationEllipsis />
            </PaginationItem>
          ) : (
            <PaginationItem key={pageNumber}>
              <PaginationLink
                onClick={() => handlePageChange(pageNumber)}
                isActive={pageNumber === currentPage}
                className="cursor-pointer"
              >
                {pageNumber}
              </PaginationLink>
            </PaginationItem>
          )
        )}

        <PaginationItem>
          <PaginationNext
            onClick={() =>
              currentPage < pageCount && handlePageChange(currentPage + 1)
            }
            className={
              currentPage >= pageCount
                ? "pointer-events-none opacity-50"
                : "cursor-pointer"
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
