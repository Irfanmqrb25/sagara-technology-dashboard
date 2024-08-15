"use server";

import { unstable_noStore as noStore, revalidatePath } from "next/cache";
import { db } from "@/db/index";
import { students, type Student } from "@/db/schema";
import { takeFirstOrThrow } from "@/db/utils";
import { asc, count, eq, inArray, not } from "drizzle-orm";
import { generateStudent, getErrorMessage } from "@/lib/utils";
import type {
  CreateStudentSchema,
  UpdateStudentSchema,
} from "@/lib/validations";

export async function createStudent(input: CreateStudentSchema) {
  noStore();
  try {
    await db.transaction(async (tx) => {
      const newStudent = await tx
        .insert(students)
        .values({
          name: input.name,
          instance: input.instance,
          phoneNumber: input.phoneNumber,
          emailAddress: input.emailAddress,
          password: input.password,
        })
        .returning({
          id: students.id,
        })
        .then(takeFirstOrThrow);

      await tx.delete(students).where(
        eq(
          students.id,
          (
            await tx
              .select({
                id: students.id,
              })
              .from(students)
              .limit(1)
              .where(not(eq(students.id, newStudent.id)))
              .orderBy(asc(students.createdAt))
              .then(takeFirstOrThrow)
          ).id
        )
      );
    });

    revalidatePath("/");

    return {
      data: null,
      error: null,
    };
  } catch (err) {
    return {
      data: null,
      error: getErrorMessage(err),
    };
  }
}

export async function updateStudent(
  input: UpdateStudentSchema & { id: string }
) {
  noStore();
  try {
    await db
      .update(students)
      .set({
        name: input.name,
        instance: input.instance,
        phoneNumber: input.phoneNumber,
        emailAddress: input.emailAddress,
      })
      .where(eq(students.id, input.id));

    revalidatePath("/");

    return {
      data: null,
      error: null,
    };
  } catch (err) {
    return {
      data: null,
      error: getErrorMessage(err),
    };
  }
}

export async function updateStudents(input: {
  ids: string[];
  name?: Student["name"];
  emailAddress?: Student["emailAddress"];
  instance?: Student["instance"];
}) {
  noStore();
  try {
    await db
      .update(students)
      .set({
        name: input.name,
        instance: input.instance,
        emailAddress: input.emailAddress,
      })
      .where(inArray(students.id, input.ids));

    revalidatePath("/");

    return {
      data: null,
      error: null,
    };
  } catch (err) {
    return {
      data: null,
      error: getErrorMessage(err),
    };
  }
}

export async function deleteStudent(input: { id: string }) {
  try {
    await db.transaction(async (tx) => {
      await tx.delete(students).where(eq(students.id, input.id));

      await tx.insert(students).values(generateStudent());
    });

    revalidatePath("/");
  } catch (err) {
    return {
      data: null,
      error: getErrorMessage(err),
    };
  }
}

export async function deleteStudents(input: { ids: string[] }) {
  try {
    await db.transaction(async (tx) => {
      await tx.delete(students).where(inArray(students.id, input.ids));

      await tx.insert(students).values(input.ids.map(() => generateStudent()));
    });

    revalidatePath("/");

    return {
      data: null,
      error: null,
    };
  } catch (err) {
    return {
      data: null,
      error: getErrorMessage(err),
    };
  }
}

export async function getChunkedStudents(input: { chunkSize?: number } = {}) {
  try {
    const chunkSize = input.chunkSize ?? 1000;

    const totalStudents = await db
      .select({
        count: count(),
      })
      .from(students)
      .then(takeFirstOrThrow);

    const totalChunks = Math.ceil(totalStudents.count / chunkSize);

    let chunkedStudents;

    for (let i = 0; i < totalChunks; i++) {
      chunkedStudents = await db
        .select()
        .from(students)
        .limit(chunkSize)
        .offset(i * chunkSize)
        .then((students) =>
          students.map((student) => ({
            ...student,
            createdAt: student.createdAt.toString(),
            updatedAt: student.updatedAt?.toString(),
          }))
        );
    }

    return {
      data: chunkedStudents,
      error: null,
    };
  } catch (err) {
    return {
      data: null,
      error: getErrorMessage(err),
    };
  }
}
