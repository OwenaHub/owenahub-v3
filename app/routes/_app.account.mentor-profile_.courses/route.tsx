import TableCard from "~/components/cards/table-card";
import NavigateBack from "~/components/navigation/navigate-back";
import { getCreatedCourses } from "./get-courses";
import { Suspense } from "react";
import { Await } from "react-router";
import type { Route } from "./+types/route";
import Course from "./course";
import CardSkeleton2 from "~/components/skeletons/card-skeleton-2";

export async function clientLoader({ }: Route.ClientLoaderArgs) {
    try {
        const courses = getCreatedCourses();
        return { courses };
    } catch ({ response }: any) {
        return {};
    }
}

export default function MentorProfileCourses({ loaderData }: Route.ComponentProps) {
    const { courses } = loaderData;

    return (
        <section>
            <NavigateBack to="mentor profile" />
            <div className="pb-4">
                <TableCard header="Courses" cta="Create course" ctaLink="create">
                    <Suspense fallback={<CardSkeleton2 />}>
                        <Await resolve={courses}>
                            {(courses: any) => <Course courses={courses} />}
                        </Await>
                    </Suspense>
                </TableCard>
            </div>
        </section>
    )
}

