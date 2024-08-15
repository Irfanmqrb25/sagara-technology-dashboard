"use server";

import { unstable_noStore as noStore } from "next/cache";
import { db } from "@/db";
import { students, type Student } from "@/db/schema";
import { type DrizzleWhere } from "@/types";
import {
  and,
  asc,
  count,
  desc,
  gte,
  lte,
  or,
  sql,
  type SQL,
} from "drizzle-orm";

import { filterColumn } from "@/lib/filter-column";

import { type GetStudentsSchema } from "./validations";

export async function getStudents(input: GetStudentsSchema) {
  noStore();
  const {
    page,
    per_page,
    sort,
    name,
    instance,
    email_address,
    operator,
    from,
    to,
  } = input;

  try {
    // Offset to paginate the results
    const offset = (page - 1) * per_page;
    // Column and order to sort by
    // Spliting the sort string by "." to get the column and order
    // Example: "title.desc" => ["title", "desc"]
    const [column, order] = (sort?.split(".").filter(Boolean) ?? [
      "createdAt",
      "desc",
    ]) as [keyof Student | undefined, "asc" | "desc" | undefined];

    // Convert the date strings to date objects
    const fromDay = from ? sql`to_date(${from}, 'yyyy-mm-dd')` : undefined;
    const toDay = to ? sql`to_date(${to}, 'yyy-mm-dd')` : undefined;

    const expressions: (SQL<unknown> | undefined)[] = [
      name
        ? filterColumn({
            column: students.name,
            value: name,
          })
        : undefined,
      // Filter tasks by instance
      !!instance
        ? filterColumn({
            column: students.instance,
            value: instance,
            isSelectable: true,
          })
        : undefined,
      // Filter tasks by email
      !!email_address
        ? filterColumn({
            column: students.emailAddress,
            value: email_address,
            isSelectable: true,
          })
        : undefined,
      // Filter by createdAt
      fromDay && toDay
        ? and(gte(students.createdAt, fromDay), lte(students.createdAt, toDay))
        : undefined,
    ];
    const where: DrizzleWhere<Student> =
      !operator || operator === "and"
        ? and(...expressions)
        : or(...expressions);

    // Transaction is used to ensure both queries are executed in a single transaction
    const { data, total } = await db.transaction(async (tx) => {
      const data = await tx
        .select()
        .from(students)
        .limit(per_page)
        .offset(offset)
        .where(where)
        .orderBy(
          column && column in students
            ? order === "asc"
              ? asc(students[column])
              : desc(students[column])
            : desc(students.id)
        );

      const total = await tx
        .select({
          count: count(),
        })
        .from(students)
        .where(where)
        .execute()
        .then((res) => res[0]?.count ?? 0);

      return {
        data,
        total,
      };
    });

    const pageCount = Math.ceil(total / per_page);
    return { data, pageCount };
  } catch (err) {
    return { data: [], pageCount: 0 };
  }
}

export async function getTaskCountByEmail() {
  noStore();
  try {
    return await db
      .select({
        status: students.emailAddress,
        count: count(),
      })
      .from(students)
      .groupBy(students.emailAddress)
      .execute();
  } catch (err) {
    return [];
  }
}

export async function getTaskCountByInstance() {
  noStore();
  try {
    return await db
      .select({
        priority: students.instance,
        count: count(),
      })
      .from(students)
      .groupBy(students.instance)
      .execute();
  } catch (err) {
    return [];
  }
}
