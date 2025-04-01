import { redirect } from "react-router";
import type { Route } from "../_guest.courses_.$ulid/+types/route";
import { getCourse } from "./get-courses";
import CourseBanner from "./course-banner";
import Tags from "~/components/custom/tags";

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
    try {
        const course = await getCourse(params.ulid);
        return { course }
    } catch ({ response }: any) {
        console.log(response);
        return redirect('/')
    }
}
export default function GuestViewCourse({ loaderData }: Route.ComponentProps) {
    const { course }: { course: Course } = loaderData;

    return (
        <div>
            <CourseBanner course={course} />
            <div className="container flex flex-col gap-8">
                <section className="mt-8 md:w-2/3 inline-block">
                    <div className="border border-gray-300 p-4">
                        <h4 className="font-bold text-xl mb-3">What you'll learn</h4>
                        <div className="text-sm" dangerouslySetInnerHTML={{ __html: course.learningGoals || "" }} />
                    </div>
                </section>

                <div>
                    <h4 className="font-bold text-xl mb-4">Other related topics</h4>
                    <div>
                        <Tags args={course.tags} />
                    </div>
                </div>
            </div>
        </div>
    )
}
