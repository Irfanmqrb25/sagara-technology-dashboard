import { type Table } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
}

export function DataTablePagination<TData>({
  table,
}: DataTablePaginationProps<TData>) {
  const currentPage = table.getState().pagination.pageIndex + 1;
  const totalPages = table.getPageCount();
  const maxDisplayedPages = 7;

  const generatePageNumbers = () => {
    if (totalPages <= maxDisplayedPages) {
      return Array.from({ length: totalPages }, (_, index) => index + 1);
    }

    if (currentPage <= 4) {
      return [1, 2, 3, 4, 5, 6, 7, "..."];
    } else if (currentPage > totalPages - 4) {
      return [
        "...",
        totalPages - 6,
        totalPages - 5,
        totalPages - 4,
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    } else {
      return [
        "...",
        currentPage - 2,
        currentPage - 1,
        currentPage,
        currentPage + 1,
        currentPage + 2,
        "...",
      ];
    }
  };

  const pageNumbers = generatePageNumbers();

  return (
    <div className="flex w-full items-center justify-center md:justify-between gap-4 p-1">
      <Button
        size="sm"
        variant="outline"
        onClick={() => table.previousPage()}
        disabled={!table.getCanPreviousPage()}
        className="hidden md:block"
      >
        Previous
      </Button>
      <div className="flex items-center space-x-2">
        {pageNumbers.map((pageNumber, index) => {
          if (typeof pageNumber === "string") {
            return (
              <span
                key={index}
                className="size-8 hover:cursor-default flex items-end text-[#637381]"
              >
                {pageNumber}
              </span>
            );
          }

          return (
            <Button
              key={index}
              aria-label={`Go to page ${pageNumber}`}
              className={`size-8 hover:bg-brand hover:text-white ${
                currentPage === pageNumber
                  ? "bg-brand text-white"
                  : "bg-transparent text-[#637381]"
              }`}
              onClick={() => table.setPageIndex(pageNumber - 1)}
            >
              {pageNumber}
            </Button>
          );
        })}
      </div>
      <Button
        size="sm"
        variant="outline"
        onClick={() => table.nextPage()}
        disabled={!table.getCanNextPage()}
        className="hidden md:block"
      >
        Next
      </Button>
    </div>
  );
}
