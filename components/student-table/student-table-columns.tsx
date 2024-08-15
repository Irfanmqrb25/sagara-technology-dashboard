"use client";

import * as React from "react";
import { students, type Student } from "@/db/schema";
import { Ellipsis, Pencil, Trash } from "lucide-react";
import { type ColumnDef } from "@tanstack/react-table";
import { toast } from "sonner";

import { formatDate, getErrorMessage } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";

import { Avatar, AvatarImage } from "../ui/avatar";
import { DeleteStudentsDialog } from "../delete-student-dialog";
import { UpdateStudentDialog } from "../update-student-dialog";

export function getColumns(): ColumnDef<Student>[] {
  return [
    {
      accessorKey: "avatar",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="" />
      ),
      cell: ({ row }) => (
        <Avatar className="w-8 h-8">
          <AvatarImage src="/images/user-profile-2.png" />
        </Avatar>
      ),
      enableSorting: false,
      enableHiding: false,
      size: 50,
    },
    {
      accessorKey: "name",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Name" />
      ),
      cell: ({ row }) => (
        <div className="text-sm font-bold">{row.original.name}</div>
      ),
    },
    {
      accessorKey: "emailAddress",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Email Address" />
      ),
      cell: ({ row }) => (
        <div className="text-sm font-bold">{row.original.emailAddress}</div>
      ),
      filterFn: (row, id, value) => {
        return Array.isArray(value) && value.includes(row.getValue(id));
      },
    },
    {
      accessorKey: "phoneNumber",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Phone Number" />
      ),
      cell: ({ row }) => (
        <div className="text-sm font-bold">{row.original.phoneNumber}</div>
      ),
      filterFn: (row, id, value) => {
        return Array.isArray(value) && value.includes(row.getValue(id));
      },
      size: 200,
    },
    {
      accessorKey: "instance",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Instance" />
      ),
      cell: ({ row }) => (
        <div className="text-sm font-bold">{row.original.instance}</div>
      ),
      filterFn: (row, id, value) => {
        return Array.isArray(value) && value.includes(row.getValue(id));
      },
      size: 200,
    },
    {
      accessorKey: "createdAt",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Created At" />
      ),
      cell: ({ cell }) => (
        <div className="text-sm font-bold">
          {formatDate(cell.getValue<Date>())}
        </div>
      ),
    },
    {
      id: "actions",
      cell: function Cell({ row }) {
        const [showUpdateStudentDialog, setShowUpdateStudentDialog] =
          React.useState(false);
        const [showDeleteStudentDialog, setShowDeleteStudentDialog] =
          React.useState(false);

        return (
          <>
            <UpdateStudentDialog
              open={showUpdateStudentDialog}
              onOpenChange={setShowUpdateStudentDialog}
              student={row.original}
              showTrigger={false}
              onSuccess={() => row.toggleSelected(false)}
            />
            <DeleteStudentsDialog
              open={showDeleteStudentDialog}
              onOpenChange={setShowDeleteStudentDialog}
              students={[row.original]}
              showTrigger={false}
              onSuccess={() => row.toggleSelected(false)}
            />
            <div className="flex items-center space-x-2">
              <Button
                aria-label="Delete Student"
                variant="ghost"
                className="flex size-8 p-0 text-red-500 hover:text-red-600"
                onClick={() => setShowDeleteStudentDialog(true)}
              >
                <Trash className="size-4" aria-hidden="true" />
              </Button>
              <Button
                aria-label="Update Student"
                variant="ghost"
                className="flex size-8 p-0 text-[#F8AF4E] hover:text-[#f7ad4c]"
                onClick={() => setShowUpdateStudentDialog(true)}
              >
                <Pencil className="size-4" aria-hidden="true" />
              </Button>
            </div>
          </>
        );
      },
      size: 40,
    },
  ];
}
