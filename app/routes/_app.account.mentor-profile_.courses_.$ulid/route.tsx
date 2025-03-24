import TableCard from "~/components/cards/table-card";
import NavigateBack from "~/components/navigation/navigate-back";
import { Link } from "react-router";
import type { Route } from "./+types/route";
import { getCreatedCourse } from "./get-course";
import { ArrowRight, Plus } from "lucide-react";
import { truncateText } from "~/lib/texts";
import { STORAGE_URL } from "~/lib/keys";
import CourseModule from "./course-module";

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
    try {
        if (!params.ulid) throw new Error("Invalid request");
        const course = await getCreatedCourse(params.ulid);
        console.log(course);

        return course;
    } catch ({ response }: any) {
        return {};
    }
}

export default function route({ loaderData }: Route.ComponentProps) {
    const course: Course = loaderData;

    return (
        <section>
            <NavigateBack to="account/mentor-profile" />
            <div>
                <div
                    className="rounded-xl h-[250px] px-4 py-4 bg-gray-100 relative flex items-end"
                    style={{
                        backgroundImage: `url(${STORAGE_URL}/${course.thumbnail})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                >
                    <div className="absolute inset-0 bg-black/50 bg-opacity-50 rounded-lg"></div>
                    <div className="relative z-10 text-white">
                        <h1 className="text-2xl md:text-3xl font-semibold pb-2">{course.title}</h1>
                        <p className="text-gray-300 text-sm md:text-base">{truncateText(course.description, 200)}</p>
                    </div>
                </div>
            </div>

            <div className="pb-4 mt-10">
                <TableCard header={course.title} cta="Edit course" ctaLink="edit">
                    <CourseModule modules={course.modules} />
                    <div className="border border-gray-200 border-b-2 py-2 rounded-md hover:bg-gray-50">
                        <Link to={"module"} className="flex justify-center items-center gap-2 text-sm uppercase ">
                            <span>Add module</span>
                            <Plus size={18} />
                        </Link>
                    </div>
                </TableCard>
            </div>
        </section>
    )
}

