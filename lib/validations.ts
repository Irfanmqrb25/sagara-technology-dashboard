import { students } from "@/db/schema";
import * as z from "zod";

export const searchParamsSchema = z.object({
  page: z.coerce.number().default(1),
  per_page: z.coerce.number().default(10),
  sort: z.string().optional(),
  name: z.string().optional(),
  instance: z.string().optional(),
  email_address: z.string().optional(),
  from: z.string().optional(),
  to: z.string().optional(),
  operator: z.enum(["and", "or"]).optional(),
});

export const getStudentsSchema = searchParamsSchema;

export type GetStudentsSchema = z.infer<typeof getStudentsSchema>;

export const createStudentSchema = z
  .object({
    name: z.string(),
    emailAddress: z.string(),
    phoneNumber: z.string(),
    instance: z.enum(students.instance.enumValues),
    password: z.string(),
    retypePassword: z.string(),
  })
  .refine((data) => data.password === data.retypePassword, {
    message: "Passwords do not match",
    path: ["retypePassword"],
  });

export type CreateStudentSchema = z.infer<typeof createStudentSchema>;

export const updateStudentSchema = z.object({
  name: z.string(),
  emailAddress: z.string(),
  phoneNumber: z.string(),
  instance: z.enum(students.instance.enumValues),
  password: z.string().optional(),
  retypePassword: z.string().optional(),
});

export type UpdateStudentSchema = z.infer<typeof updateStudentSchema>;
