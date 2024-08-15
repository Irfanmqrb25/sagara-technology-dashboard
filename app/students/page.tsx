import { StudentTable } from "@/components/student-table/students-table";
import { getStudents } from "@/lib/queries";
import { searchParamsSchema } from "@/lib/validations";
import { SearchParams } from "@/types";

export interface IndexPageProps {
  searchParams: SearchParams;
}

const StudentsPage = ({ searchParams }: IndexPageProps) => {
  const search = searchParamsSchema.parse(searchParams);

  const tasksPromise = getStudents(search);

  return <StudentTable studentsPromise={tasksPromise} />;
};

export default StudentsPage;
