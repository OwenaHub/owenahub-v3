import { Await, Link, type MetaFunction } from "react-router";
import type { Route } from "../_app.my-courses/+types/route";
import { getEnrolledCourses } from "./course";
import { Suspense } from "react";
import CardSkeleton from "~/components/skeletons/card-skeleton-2";
import { STORAGE_URL } from "~/lib/keys";

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

            <Suspense fallback={<CardSkeleton type='course' />}>
                <Await resolve={enrolledCourses}>
                    {(enrolledCourses) =>
                        <div className="grid grid-cols-1 gap-x-3 gap-y-4 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-3">
                            {enrolledCourses.length
                                ? (
                                    enrolledCourses.map((course: any) => (
                                        <div
                                            className="grid grid-cols-4 border border-gray-300 gap-3 border-b pb-5 bg-white h-full rounded group relative transition animated fadeIn"
                                            key={course.id}
                                        >
                                            <div className="bg-slate-100 col-span-4 md:col-span-4 md:rounded-t w-full aspect-square group-hover:opacity-75 lg:aspect-auto h-30 lg:h-44 overflow-hidden">
                                                <img
                                                    src={course.thumbnail
                                                        ? `${STORAGE_URL}/${course.thumbnail}`
                                                        : "/images/banners/default-course-img.png"}
                                                    alt={course.title}
                                                    className="h-full rounded-t w-full object-cover"
                                                />
                                            </div>

                                            {/* Content Wrapper */}
                                            <div className="flex flex-col col-span-4 px-3 flex-grow justify-between md:mt-2">
                                                {/* Title & Description */}
                                                <div className="flex flex-col gap-1.5 mb-3">
                                                    <div className="flex items-center">
                                                        <h3 className="text-gray-600 font-bold leading-5">
                                                            <span className="leading-[-5px]">{course.title}</span>
                                                            <Link to={`/my-courses/${course.id}`}>
                                                                <span aria-hidden="true" className="absolute inset-0" />
                                                            </Link>
                                                        </h3>
                                                    </div>
                                                </div>

                                                {/* Course learning progress */}
                                                <div className="mt-auto">
                                                    {course.modules && course.modules.length ? (
                                                        (() => {
                                                            const totalLessons = course.modules.reduce((total: number, module: any) => total + module.lessons.length, 0);

                                                            const completedLessons = course.modules.reduce((total: number, module: any) =>
                                                                total + module.lessons.filter((lesson: any) => lesson.completed).length, 0);

                                                            const progressPercentage = Math.round((completedLessons / totalLessons) * 100);

                                                            return (
                                                                <div className="">
                                                                    <div className="bg-gray-100 rounded-lg h-1.5 mb-2">
                                                                        <div
                                                                            className="bg-[#315E8B] h-1.5 rounded-lg"
                                                                            style={{ width: `${progressPercentage}%` }}
                                                                        />
                                                                    </div>
                                                                    <p className="text-xs text-gray-500 mt-1">
                                                                        {completedLessons} of {totalLessons} lessons completed ({progressPercentage}%)
                                                                    </p>
                                                                </div>
                                                            );
                                                        })()
                                                    ) : (
                                                        <p className="text-xs text-gray-500 mt-1">No lessons available</p>
                                                    )}
                                                </div>
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
