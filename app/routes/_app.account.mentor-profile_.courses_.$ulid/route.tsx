import NavigateBack from "~/components/navigation/navigate-back";
import { Outlet } from "react-router";
import type { Route } from "./+types/route";
import { truncateText } from "~/lib/texts";
import { STORAGE_URL } from "~/lib/keys";
import { getCreatedCourse } from "./get-course";

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
    try {
        if (!params.ulid) throw new Error("Invalid request");
        const course = await getCreatedCourse(params.ulid);
        return course;
    } catch ({ response }: any) {
        return {};
    }
}

export default function route({ loaderData }: Route.ComponentProps) {
    const course: Course = loaderData;

    return (
        <section>
            <NavigateBack to="courses" />
            <div>
                <div
                    className="rounded-2xl h-[250px] px-4 py-4 bg-gray-100 relative flex items-end bg-cover bg-center"
                    style={{
                        backgroundImage: course.thumbnail ? `url(${STORAGE_URL}/${course.thumbnail})` : "url(/images/banners/default-course-img.png)",
                    }}
                >
                    <div className="absolute inset-0 bg-black/50 bg-opacity-50 rounded-2xl"></div>
                    <div className="relative z-10 text-white">
                        <h1 className="text-2xl md:text-3xl font-semibold pb-2">{course.title}</h1>
                        <p className="text-gray-300 text-sm md:text-base">{truncateText(course.description, 200)}</p>
                    </div>
                </div>
            </div>

            <Outlet context={course} />

        </section>
    )
}

