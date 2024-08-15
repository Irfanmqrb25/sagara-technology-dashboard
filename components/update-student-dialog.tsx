"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusIcon, Loader2, Pencil } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { type Row } from "@tanstack/react-table";

import { useMediaQuery } from "@/hooks/use-media-query";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import { updateStudent } from "@/actions/student";
import {
  updateStudentSchema,
  type UpdateStudentSchema,
} from "@/lib/validations";
import { UpdateStudentForm } from "./form/update-student-form";
import { Student } from "@/db/schema";

interface UpdateStudentsDialogProps
  extends React.ComponentPropsWithoutRef<typeof Dialog> {
  student: Row<Student>["original"];
  showTrigger?: boolean;
  onSuccess?: () => void;
}

export function UpdateStudentDialog({
  student,
  showTrigger = true,
  onSuccess,
  ...props
}: UpdateStudentsDialogProps) {
  const [isUpdatePending, startUpdateTransition] = React.useTransition();
  const isDesktop = useMediaQuery("(min-width: 640px)");

  const form = useForm<UpdateStudentSchema>({
    resolver: zodResolver(updateStudentSchema),
    defaultValues: {
      name: student.name,
      instance: student.instance,
      phoneNumber: student.phoneNumber,
      emailAddress: student.emailAddress || "",
      password: "",
    },
  });

  function onSubmit(input: UpdateStudentSchema) {
    startUpdateTransition(async () => {
      const { error } = await updateStudent({
        id: student.id,
        ...input,
      });

      if (error) {
        toast.error(error);
        return;
      }

      props.onOpenChange?.(false);
      toast.success("Student updated successfully");
      onSuccess?.();
    });
  }

  if (isDesktop)
    return (
      <Dialog {...props}>
        <DialogContent className="w-[612px] p-0">
          <DialogHeader className="px-6 py-4 border-b-[1px]">
            <DialogTitle className="font-bold">Add New Student</DialogTitle>
          </DialogHeader>
          <UpdateStudentForm form={form} onSubmit={onSubmit}>
            <DialogFooter className="px-6 py-4 border-t-[1px] sm:space-x-0">
              <Button
                disabled={isUpdatePending}
                size="sm"
                className="bg-brand hover:bg-brand/90 hover:text-white"
              >
                {isUpdatePending && (
                  <Loader2
                    className="mr-2 size-4 animate-spin"
                    aria-hidden="true"
                  />
                )}
                Save
              </Button>
            </DialogFooter>
          </UpdateStudentForm>
        </DialogContent>
      </Dialog>
    );

  return (
    <Drawer {...props}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Add New Student</DrawerTitle>
        </DrawerHeader>
        <DrawerFooter className="gap-2 sm:space-x-0">
          <Button disabled={isUpdatePending}>
            {isUpdatePending && (
              <Loader2
                className="mr-2 size-4 animate-spin"
                aria-hidden="true"
              />
            )}
            Save
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
