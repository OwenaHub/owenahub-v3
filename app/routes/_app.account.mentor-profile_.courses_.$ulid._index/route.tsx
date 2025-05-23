import TableCard from "~/components/cards/table-card";
import { Link, useOutletContext } from "react-router";
import type { Route } from "./+types/route";
import { Plus } from "lucide-react";
import CourseModule from "./course-module";

export default function MentorCourseModules({ }: Route.ComponentProps) {
    const course: Course = useOutletContext();

    return (
        <section>
            <div className="pb-4 mt-10">
                <TableCard header="Course modules">
                    <CourseModule modules={course.modules} />
                    <div className="border border-gray-200 border-b-2 py-2 rounded-md hover:bg-gray-50">
                        <Link to={"modules/create"} className="flex justify-center items-center gap-2 text-sm uppercase ">
                            <span>Add module</span>
                            <Plus size={18} />
                        </Link>
                    </div>
                </TableCard>
            </div>
        </section>
    )
}
