"use client";

import * as React from "react";
import Image from "next/image";
import type { DataTableFilterField } from "@/types";
import { ChevronDown, X } from "lucide-react";
import type { Table } from "@tanstack/react-table";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTableFacetedFilter } from "@/components/data-table/data-table-faceted-filter";
import { DataTableViewOptions } from "@/components/data-table/data-table-view-options";
import { DropdownMenu, DropdownMenuContent } from "../ui/dropdown-menu";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";

interface DataTableToolbarProps<TData>
  extends React.HTMLAttributes<HTMLDivElement> {
  table: Table<TData>;
  filterFields?: DataTableFilterField<TData>[];
}

export function DataTableToolbar<TData>({
  table,
  filterFields = [],
  children,
  className,
  ...props
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  const { searchableColumns, filterableColumns } = React.useMemo(() => {
    return {
      searchableColumns: filterFields.filter((field) => !field.options),
      filterableColumns: filterFields.filter((field) => field.options),
    };
  }, [filterFields]);

  return (
    <div
      className={cn(
        "flex w-full items-center justify-between space-x-2 overflow-auto p-1",
        className
      )}
      {...props}
    >
      <div className="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="sm" variant="outline" className="text-xs font-bold">
              <Image
                src="/images/icon-filters.svg"
                alt="logo"
                width={16}
                height={16}
                className="mr-2"
              />
              Filters
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="space-y-1.5 w-[213px]">
            <Button
              variant="outline"
              className="text-xs font-medium flex items-center justify-between w-full h-8 px-2"
            >
              <span>Instance</span>
              <ChevronDown className="ml-2 h-4 w-4 text-muted-foreground" />
            </Button>
            <div className="rounded-md border bg-[#f4f4f4] px-2 h-8 inline-flex items-center w-full text-xs font-medium text-muted-foreground">
              is
            </div>
            <Input
              placeholder="Enter condition"
              className="h-8 w-full text-xs px-2 placeholder:text-xs placeholder:font-medium font-medium focus-visible:ring-0 focus-visible:ring-offset-0"
            />
            <Button
              variant="outline"
              className="text-xs font-medium w-full h-8 px-2 bg-brand hover:bg-brand/90 text-white hover:text-white"
            >
              Add Filter
            </Button>
          </DropdownMenuContent>
        </DropdownMenu>
        {children}
      </div>
      <div className="flex items-center space-x-2">
        {searchableColumns.length > 0 &&
          searchableColumns.map(
            (column) =>
              table.getColumn(column.value ? String(column.value) : "") && (
                <Input
                  key={String(column.value)}
                  placeholder={column.placeholder}
                  value={
                    (table
                      .getColumn(String(column.value))
                      ?.getFilterValue() as string) ?? ""
                  }
                  onChange={(event) =>
                    table
                      .getColumn(String(column.value))
                      ?.setFilterValue(event.target.value)
                  }
                  className="h-8 w-40 lg:w-64 placeholder:text-xs placeholder:font-medium"
                />
              )
          )}
        {filterableColumns.length > 0 &&
          filterableColumns.map(
            (column) =>
              table.getColumn(column.value ? String(column.value) : "") && (
                <DataTableFacetedFilter
                  key={String(column.value)}
                  column={table.getColumn(
                    column.value ? String(column.value) : ""
                  )}
                  title={column.label}
                  options={column.options ?? []}
                />
              )
          )}
        {isFiltered && (
          <Button
            aria-label="Reset filters"
            variant="ghost"
            className="h-8 px-2 lg:px-3"
            onClick={() => table.resetColumnFilters()}
          >
            Reset
            <X className="ml-2 size-4" aria-hidden="true" />
          </Button>
        )}
        <DataTableViewOptions table={table} />
      </div>
    </div>
  );
}
