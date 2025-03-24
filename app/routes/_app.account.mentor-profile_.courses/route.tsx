import TableCard from "~/components/cards/table-card";
import NavigateBack from "~/components/navigation/navigate-back";
import { getCreatedCourses } from "./get-courses";
import { Suspense } from "react";
import { Await } from "react-router";
import type { Route } from "../_app.account.mentor-profile_.courses/+types/route";
import Course from "./course";
import CardSkeleton from "~/components/skeletons/card-skeleton";

export async function clientLoader({ }: Route.ClientLoaderArgs) {
    try {
        const courses = getCreatedCourses();
        console.log(courses);

        return { courses };
    } catch ({ response }: any) {
        return {};
    }
}

export default function route({ loaderData }: Route.ComponentProps) {
    const { courses } = loaderData;

    return (
        <section>
            <NavigateBack to="account/mentor-profile" />
            <div className="pb-4">
                <TableCard header="Courses" cta="Create course" ctaLink="create">
                    <Suspense fallback={<CardSkeleton />}>
                        <Await resolve={courses}>
                            {(courses: any) => <Course courses={courses} />}
                        </Await>
                    </Suspense>
                </TableCard>
            </div>
        </section>
    )
}

