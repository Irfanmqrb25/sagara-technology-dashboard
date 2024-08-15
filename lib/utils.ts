import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { generateId } from "@/lib/id";
import { Student, students } from "@/db/schema";
import { faker } from "@faker-js/faker";
import { isRedirectError } from "next/dist/client/components/redirect";
import { toast } from "sonner";
import { z } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateStudent(): Student {
  return {
    id: generateId("student"),
    name: faker.person.fullName(),
    emailAddress: faker.internet.email(),
    phoneNumber: faker.phone.number(),
    instance: faker.helpers.shuffle(students.instance.enumValues)[0],
    password: faker.internet.password(),
    createdAt: new Date(),
    updatedAt: new Date(),
  };
}

export function getErrorMessage(err: unknown) {
  const unknownError = "Something went wrong, please try again later.";

  if (err instanceof z.ZodError) {
    const errors = err.issues.map((issue) => {
      return issue.message;
    });
    return errors.join("\n");
  } else if (err instanceof Error) {
    return err.message;
  } else if (isRedirectError(err)) {
    throw err;
  } else {
    return unknownError;
  }
}

export function showErrorToast(err: unknown) {
  const errorMessage = getErrorMessage(err);
  return toast.error(errorMessage);
}

export function formatDate(
  date: Date | string | number,
  opts: Intl.DateTimeFormatOptions = {}
) {
  return new Intl.DateTimeFormat("en-US", {
    month: opts.month ?? "long",
    day: opts.day ?? "numeric",
    year: opts.year ?? "numeric",
    ...opts,
  }).format(new Date(date));
}
