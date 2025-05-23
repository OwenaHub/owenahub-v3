import { Await, Link, type MetaFunction } from "react-router";
import type { Route } from "../_app.my-courses/+types/route";
import { getEnrolledCourses } from "./course";
import { Suspense } from "react";
import CardSkeleton from "~/components/skeletons/card-skeleton";
import { ChevronRight } from "lucide-react";

export const meta: MetaFunction = () => {
    return [
        { title: "My Courses | OwenaHub" },
        { name: "description", content: "The Learner's Hub" },
    ];
};

export async function clientLoader({ }: Route.ClientLoaderArgs) {
    try {
        const enrolledCourses = getEnrolledCourses();

        return { enrolledCourses };
    } catch ({ response }: any) {
        return {};
    }
}

export default function Courses({ loaderData }: Route.ComponentProps) {
    const { enrolledCourses } = loaderData;

    return (
        <section className="md:px-10 mt-10">
            <div className="md:mt-20 mb-8 flex gap-8 justify-between items-start">
                <div>
                    <h1 className="text-xl md:text-2xl text-primary-theme mb-3 font-bold">
                        My courses
                    </h1>
                    <p className="text-sm leading-4">
                        Here are coureses you have enrolled in
                    </p>
                </div>
            </div>

            <section className="my-8">
                <Link to="/courses" className="flex items-center gap-2 uppercase w-max px-2 py-1 border border-b-2 border-sky-600 text-sky-600 font-semibold rounded bg-sky-50 focus:border-b relative focus:top-0.5 hover:bg-white transition-all">
                    <span className="text-xs">Explore courses</span>
                    <ChevronRight size={14} />
                </Link>
            </section>

            <Suspense fallback={<CardSkeleton type='card' />}>
                <Await resolve={enrolledCourses}>
                    {(enrolledCourses) =>
                        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 mb-10">
                            {enrolledCourses.length
                                ? (enrolledCourses.map((course: any) => (
                                    <div
                                        className="grid grid-cols-4 shadow-xs hover:shadow-md border border-gray-100 bg-gray-50 gap-3 border-b py-3.5 px-1 h-full rounded group relative transition animated fadeIn"
                                        key={course.id}
                                    >
                                        <div className="flex flex-col col-span-4 px-3 flex-grow justify-between">
                                            <section className="flex flex-col justify-between min-h-full gap-">
                                                <div className="flex flex-col gap-1.5 mb-3">
                                                    <div className="flex items-center">
                                                        <h3 className="text-gray-600 font-medium leading-5">
                                                            <span className="leading-[-5px]">{course.title}</span>
                                                            <Link to={`/my-courses/${course.id}`}>
                                                                <span aria-hidden="true" className="absolute inset-0" />
                                                            </Link>
                                                        </h3>
                                                    </div>
                                                </div>

                                                <div className="mt-auto">
                                                    {course.modules && course.modules.length ? (
                                                        (() => {
                                                            const totalLessons = course.modules.reduce((total: number, module: any) => total + module.lessons.length, 0);

                                                            const completedLessons = course.modules.reduce((total: number, module: any) =>
                                                                total + module.lessons.filter((lesson: any) => lesson.completed).length, 0);

                                                            const progressPercentage = Math.round((completedLessons / totalLessons) * 100);

                                                            return (
                                                                <>
                                                                    <div className="bg-white rounded-lg h-1.5 mb-2">
                                                                        <div
                                                                            className={`h-1.5 rounded ${progressPercentage === 100 ? 'bg-green-500' : 'bg-[#315E8B]'}`}
                                                                            style={{ width: `${progressPercentage}%` }}
                                                                        />
                                                                    </div>
                                                                    <p className="text-xs text-gray-500 mt-1">
                                                                        {completedLessons} of {totalLessons} lessons completed ({progressPercentage}%)
                                                                    </p>
                                                                </>
                                                            );
                                                        })()
                                                    ) : (
                                                        <p className="text-xs text-gray-500 mt-1">No lessons available</p>
                                                    )}
                                                </div>
                                            </section>
                                        </div>
                                    </div>
                                ))
                                )
                                : <p className="text-gray-500 text-sm py-1.5 w-max rounded">
                                    You haven't enrolled in any courses, <Link to="/courses" className="font-bold underline">see courses</Link>
                                </p>
                            }
                        </div>
                    }
                </Await>
            </Suspense>
        </section>
    )
}
