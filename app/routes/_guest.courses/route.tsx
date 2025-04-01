import { Search } from "lucide-react"
import { Await, redirect } from "react-router"
import Badge from "~/components/custom/badge"
import { getCourses } from "./get-courses"
import { Suspense } from "react"
import CardSkeleton from "~/components/skeletons/card-skeleton copy"
import type { Route } from "../_guest.courses/+types/route"
import Courses from "./courses"

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
        <div className="py-[4rem] mt-15">
            <div className="container mb-8">
                <h2 className="text-2xl md:text-3xl text-gray-800 font-bold mb-2">Courses</h2>
                <p className="text-gray-500 text-sm md:text-base mb-4">
                    From critical skills to technical topics, OwenaHub supports your professional development.
                </p>

                <div className="flex gap-3 flex-col md:flex-row md:items-center justify-between">
                    <div className="w-full md:w-max flex items-center px-3 rounded-sm outline shadow focus-within:outline group focus-within:outline-primary-theme">
                        <input
                            type="search"
                            className="py-2 w-full md:w-max  outline-none"
                            placeholder="Search courses"
                        />
                        <Search
                            strokeWidth={1.3}
                            size={27}
                            className="text-gray-500 group-focus-within:text-primary-theme"
                        />
                    </div>

                    <div className="flex flex-nowrap gap-1 items-center overflow-x-auto py-3">
                        <Badge title="JavaScript" />
                        <Badge title="Python" />
                        <Badge title="Algorithms" />
                        <Badge title="CSS" />
                        <Badge title="Data science" />
                        <Badge title="Engineering" />
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
