"use client";
"use memo";

import * as React from "react";
import { type Student } from "@/db/schema";
import { type DataTableFilterField } from "@/types";

import { useDataTable } from "@/hooks/use-data-table";
import { DataTable } from "@/components/data-table/data-table";
import { DataTableToolbar } from "@/components/data-table/data-table-toolbar";

import { getColumns } from "./student-table-columns";
import { type getStudents } from "@/lib/queries";
import { StudentTableToolbarActions } from "./student-table-toolbar-actions";

interface StudentsTableProps {
  studentsPromise: ReturnType<typeof getStudents>;
}

export function StudentTable({ studentsPromise }: StudentsTableProps) {
  const { data, pageCount } = React.use(studentsPromise);

  const columns = React.useMemo(() => getColumns(), []);
  const filterFields: DataTableFilterField<Student>[] = [
    {
      label: "Name",
      value: "name",
      placeholder: "Search by name...",
    },
  ];

  const { table } = useDataTable({
    data,
    columns,
    pageCount,
    filterFields,
    initialState: {
      sorting: [{ id: "createdAt", desc: true }],
    },
    getRowId: (originalRow, index) => `${originalRow.id}-${index}`,
  });

  return (
    <DataTable table={table}>
      <DataTableToolbar table={table} filterFields={filterFields}>
        <StudentTableToolbarActions table={table} />
      </DataTableToolbar>
    </DataTable>
  );
}
