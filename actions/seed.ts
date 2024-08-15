"use server";

import { db } from "@/db/index";
import { students, type Student } from "@/db/schema";

import { generateStudent } from "@/lib/utils";

export async function seedStudents(input: { count: number }) {
  const count = input.count ?? 100;

  try {
    const allStudents: Student[] = [];

    for (let i = 0; i < count; i++) {
      allStudents.push(generateStudent());
    }

    await db.delete(students);

    console.log("📝 Inserting students", allStudents.length);

    await db.insert(students).values(allStudents).onConflictDoNothing();
  } catch (err) {
    console.error(err);
  }
}
