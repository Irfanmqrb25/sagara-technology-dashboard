"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusIcon, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

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

import { createStudent } from "@/actions/student";
import {
  createStudentSchema,
  type CreateStudentSchema,
} from "@/lib/validations";
import { CreateStudentForm } from "./form/create-student-form";

export function CreateStudentDialog() {
  const [open, setOpen] = React.useState(false);
  const [isCreatePending, startCreateTransition] = React.useTransition();
  const isDesktop = useMediaQuery("(min-width: 640px)");

  const form = useForm<CreateStudentSchema>({
    resolver: zodResolver(createStudentSchema),
  });

  function onSubmit(input: CreateStudentSchema) {
    startCreateTransition(async () => {
      const { error } = await createStudent(input);

      if (error) {
        toast.error(error);
        return;
      }

      form.reset();
      setOpen(false);
      toast.success("Student added successfully");
    });
  }

  if (isDesktop)
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="bg-brand text-white text-xs font-bold hover:bg-brand/90 hover:text-white"
          >
            <PlusIcon className="mr-2 size-4" aria-hidden="true" />
            Add User
          </Button>
        </DialogTrigger>
        <DialogContent className="w-[612px] p-0">
          <DialogHeader className="px-6 py-4 border-b-[1px]">
            <DialogTitle className="font-bold">Add New Student</DialogTitle>
          </DialogHeader>
          <CreateStudentForm form={form} onSubmit={onSubmit}>
            <DialogFooter className="px-6 py-4 border-t-[1px] sm:space-x-0">
              <Button
                disabled={isCreatePending}
                size="sm"
                className="bg-brand hover:bg-brand/90 hover:text-white"
              >
                {isCreatePending && (
                  <Loader2
                    className="mr-2 size-4 animate-spin"
                    aria-hidden="true"
                  />
                )}
                Save
              </Button>
            </DialogFooter>
          </CreateStudentForm>
        </DialogContent>
      </Dialog>
    );

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline" size="sm">
          <PlusIcon className="mr-2 size-4" aria-hidden="true" />
          Add User
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Add New Student</DrawerTitle>
        </DrawerHeader>
        <DrawerFooter className="gap-2 sm:space-x-0">
          <Button disabled={isCreatePending}>
            {isCreatePending && (
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
