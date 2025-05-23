import { Search } from "lucide-react"
import { Await, redirect } from "react-router"
import Badge from "~/components/custom/badge"
import { getCourses } from "./get-courses"
import { Suspense } from "react"
import CardSkeleton from "~/components/skeletons/card-skeleton"
import type { Route } from "../_guest.courses/+types/route"
import Courses from "./courses"
import { type MetaFunction } from "react-router";

export const meta: MetaFunction = () => {
    return [
        { title: "Courses | OwenaHub" },
        { name: "description", content: "The Learner's Hub" },
    ];
};

export async function clientLoader(_: Route.ClientLoaderArgs) {
    try {
        const courses = getCourses();
        return { courses }
    } catch ({ response }: any) {
        console.log(response);
        return redirect('/')
    }
}

export default function GuestCourses({ loaderData }: Route.ComponentProps) {
    const { courses } = loaderData;

    return (
        <div className="py-[4rem] mt-8">
            <div className="container mb-8">
                <h1 className="text-2xl md:text-3xl mb-2">
                    <span className="font-light">OwenaHub</span> <span className="font-bold">Courses</span>
                </h1>
                <p className="text-gray-500 text-xs md:text-base mb-4">
                    From critical skills to technical topics, OwenaHub supports your professional development.
                </p>

                <div className="flex gap-3 flex-col md:flex-row md:items-center justify-between">
                    <div className="w-full shadow md:w-max flex items-center p-1 ps-5 rounded-full outline focus-within:outline group focus-within:outline-primary-theme">
                        <input
                            type="search"
                            className="py-2 w-full md:w-max outline-none"
                            placeholder="Search courses"
                        />
                        <div className="text-gray-500 bg-primary-bg group-focus-within:text-primary-theme h-full p-2 rounded-full">
                            <Search
                                strokeWidth={2}
                                size={27}
                                className=""
                            />
                        </div>
                    </div>

                    <div className="flex flex-nowrap gap-3 items-center overflow-x-auto py-3">
                        <Badge
                            title="JavaScript"
                            description="80+ learners"
                        />
                        <Badge
                            title="Python"
                            description="20+ learners"
                        />
                        <Badge
                            title="Algorithms"
                            description="30+ learners"
                        />
                        <Badge
                            title="CSS"
                            description="120+ learners"
                        />
                        <Badge
                            title="Data science"
                            description="10+ learners"
                        />
                        <Badge
                            title="Engineering"
                            description="80+ learners"
                        />
                    </div>
                </div>
            </div>

            <section className="container">
                <Suspense fallback={<CardSkeleton type='course' />}>
                    <Await resolve={courses}>
                        {(courses) => <Courses courses={courses} />}
                    </Await>
                </Suspense>
            </section>
        </div>
    )
}
