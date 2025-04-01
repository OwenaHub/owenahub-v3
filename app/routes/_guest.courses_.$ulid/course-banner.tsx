import { Calendar, Globe } from 'lucide-react'
import Rating from '~/components/custom/rating'
import { STORAGE_URL } from '~/lib/keys'
import dayjs from "dayjs";
import { Button } from '~/components/ui/button';


export default function CourseBanner({ course }: { course: Course }) {
    return (
        <>
            <section className="bg-[#fff7eb] max-h-[50vh] py-20 hidden md:block">
                <div className="container flex mt-20 gap-10">
                    <div className="flex basis-2/3 flex-col gap-4 items-start">
                        <h1 className="text-xl md:text-3xl font-bold">
                            {course.title}
                        </h1>
                        <p>
                            {course.about}
                        </p>
                        <div className="flex items-center gap-2 font-bold">
                            <span className="text-primary-theme">5.0</span>
                            <Rating />
                            <span>(99+ ratings) 2,394 students</span>
                        </div>
                        <div>
                            Create by Ernest Haruna
                        </div>
                        <div className="flex gap-2 items-center">
                            <div className="flex gap-2 items-center">
                                <Calendar strokeWidth={1} size={18} />{" "}
                                <span>
                                    Last updated {" "}
                                    {course.updatedAt
                                        ? dayjs(course.updatedAt).format("MM/YYYY")
                                        : dayjs(course.createdAt).format("MM/YYYY")
                                    }
                                </span>
                            </div>
                            <div className="flex gap-2 items-center">
                                <Globe strokeWidth={1} size={18} />{" "}
                                <span>
                                    English
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="basis-1/3 z-10">
                        <div className="bg-slate-100 col-span-1 md:col-span-4 w-full aspect-square group-hover:opacity-75 lg:aspect-auto lg:h-auto overflow-hidden">
                            <img
                                src={course.thumbnail
                                    ? `${STORAGE_URL}/${course.thumbnail}`
                                    : "/images/banners/default-course-img.png"}
                                alt={course.title}
                                className="h-full w-full object-cover"
                            />
                        </div>
                        <div className="bg-white shadow text-xl p-5 font-bold flex flex-col gap-2">
                            <div className="mb-2">
                                <h3 className="font-semibold text-gray-800">
                                    Subscribe to OwenaHub's top courses
                                </h3>

                                <p className="text-sm font-light">
                                    Get this course, plus 12,000+ of our top-rated courses, with Personal Plan. Learn more
                                </p>
                            </div>
                            <Button className="w-full rounded py-6 text-lg">
                                Try personal plan today
                            </Button>
                            <div className="text-center text-xs max-w-xl font-light">
                                Starting at ₦7,500 per month after trial
                                Cancel anytime
                            </div>

                            <div className="flex items-center py-5">
                                <div className="flex-1 border-t" />
                                <div className="text-gray-400 text-xs font-bold mx-4">or</div>
                                <div className="flex-1 border-t" />
                            </div>

                            <h4 className="font-bold text-2xl">
                                ₦{parseInt(course.price).toLocaleString()}
                            </h4>

                            <Button className="bg-primary-theme text-primary font-bold rounded py-6 text-lg">
                                Enroll now
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            <section className='md:hidden'>
                <div className="bg-slate-100 col-span-1 md:col-span-4 w-full aspect-video group-hover:opacity-75 lg:aspect-auto lg:h-auto overflow-hidden">
                    <img
                        src={course.thumbnail
                            ? `${STORAGE_URL}/${course.thumbnail}`
                            : "/images/banners/default-course-img.png"}
                        alt={course.title}
                        className="h-full w-full object-cover"
                    />
                </div>

                <div className='container mt-7'>
                    <div className="flex flex-col gap-2 items-start mb-14">
                        <h1 className="text-2xl md:text-3xl font-bold">
                            {course.title}
                        </h1>
                        <p className='text-sm'>
                            {course.about}
                        </p>
                        <div className="mt-3 flex text-xs items-center gap-2 font-bold">
                            <span className="text-primary-theme">5.0</span>
                            <Rating />
                            <span>(99+ ratings) 2,394 students</span>
                        </div>
                        <div className='text-xs mb-4'>
                            Created by Ernest Haruna
                        </div>
                        <div className="flex gap-2 items-center text-xs">
                            <div className="flex gap-2 items-center">
                                <Calendar strokeWidth={1} size={18} />{" "}
                                <span>
                                    Last updated {" "}
                                    {course.updatedAt
                                        ? dayjs(course.updatedAt).format("MM/YYYY")
                                        : dayjs(course.createdAt).format("MM/YYYY")
                                    }
                                </span>
                            </div>
                            <div className="flex gap-2 items-center">
                                <Globe strokeWidth={1} size={18} />{" "}
                                <span>
                                    English
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white shadow text-xl font-bold flex flex-col gap-2">
                        <div className="mb-2">
                            <h3 className="font-semibold text-gray-800">
                                Subscribe to OwenaHub's top courses
                            </h3>

                            <p className="text-sm font-light">
                                Get this course, plus 12,000+ of our top-rated courses, with Personal Plan. Learn more
                            </p>
                        </div>
                        <Button className="w-full rounded py-6 text-lg">
                            Try personal plan today
                        </Button>
                        <div className="text-center text-xs max-w-xl font-light">
                            Starting at ₦7,500 per month after trial
                            Cancel anytime
                        </div>

                        <div className="flex items-center py-5">
                            <div className="flex-1 border-t" />
                            <div className="text-gray-400 text-xs font-bold mx-4">or</div>
                            <div className="flex-1 border-t" />
                        </div>

                        <h4 className="font-bold text-2xl">
                            ₦{parseInt(course.price).toLocaleString()}
                        </h4>

                        <Button className="bg-primary-theme text-primary font-bold rounded py-6 text-lg">
                            Enroll now
                        </Button>
                    </div>
                </div>
            </section>
        </>
    )
}
