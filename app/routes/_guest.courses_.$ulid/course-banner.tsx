import { Calendar, Globe } from 'lucide-react'
import Rating from '~/components/custom/rating'
import { STORAGE_URL } from '~/lib/keys'
import dayjs from "dayjs";
import { Button } from '~/components/ui/button';
import { Link } from 'react-router';
import EnrollCourse from './enroll-course';

export default function CourseBanner({ course, isEnrolled }: { course: Course, isEnrolled: boolean }) {
    return (
        <>
            <section className="bg-[#fff7eb] max-h-[46vh] py-20 hidden md:block">
                <div className="container flex mt-20 gap-10 overflow-auto h-screen">
                    <div className="flex basis-2/3 flex-col gap-4 items-start">
                        <h1 className="text-xl md:text-4xl font-bold">
                            {course.title}
                        </h1>
                        <p>
                            {course.about}
                        </p>
                        <div className="flex items-center gap-2 font-semibold">
                            <span className="text-primary-theme">5.0</span>
                            <Rating />
                            <span>(99+ ratings) 2,394 students</span>
                        </div>
                        <div>
                            Created by {" "}
                            <Link to="#" className="text-primary-theme underline underline-offset-2">
                                {course.creator?.name}
                            </Link>
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
                    <div className="basis-1/3 z-10 !sticky top-0">
                        <div className="bg-slate-100 col-span-1 border-t shadow-lg md:col-span-4 w-full aspect-square group-hover:opacity-75 lg:aspect-auto lg:h-auto overflow-hidden">
                            <img
                                src={course.thumbnail
                                    ? `${STORAGE_URL}/${course.thumbnail}`
                                    : "/images/banners/default-course-img.png"}
                                alt={course.title}
                                className="h-full w-full object-cover"
                            />
                        </div>
                        <div className="bg-white shadow-lg text-xl p-5 font-bold flex flex-col gap-2">
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
                                <div className="text-gray-500 text-xs mx-4">or</div>
                                <div className="flex-1 border-t" />
                            </div>

                            <h4 className="font-bold text-2xl">
                                {course.price !== "0.00"
                                    ? (<> ₦{parseInt(course.price).toLocaleString()}</>)
                                    : <span className='text-gray-700'>
                                        FREE COURSE
                                    </span>}

                            </h4>
                            {isEnrolled
                                ? <div>
                                    <Button
                                        disabled
                                        variant="secondary"
                                        className="w-full py-6 text-sm font-bold uppercase rounded">
                                        Already enrolled
                                    </Button>
                                    <Link
                                        to={`/courses/${course.id}/learn`}
                                        className="mt-3 inline-block text-blue-500 text-center text-xs font-light uppercase w-full hover:underline underline-offset-2">
                                        Go to course
                                    </Link>
                                </div>

                                : <EnrollCourse course={course} />
                            }
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
                        <p className='text-base'>
                            {course.about}
                        </p>
                        <div className="mt-3 flex text-sm items-center gap-2 font-semibold">
                            <span className="text-primary-theme">5.0</span>
                            <Rating />
                            <span>(99+ ratings) 2,394 students</span>
                        </div>
                        <div className='text-sm mb-4'>
                            Created by {" "}
                            <Link to="#" className="text-primary-theme underline underline-offset-2">
                                {course.creator?.name}
                            </Link>
                        </div>

                        <div className="flex flex-col gap-3 text-sm">
                            <div className="flex gap-2 items-center">
                                <Calendar strokeWidth={1} size={20} />{" "}
                                <span>
                                    Last updated {" "}
                                    {course.updatedAt
                                        ? dayjs(course.updatedAt).format("MM/YYYY")
                                        : dayjs(course.createdAt).format("MM/YYYY")
                                    }
                                </span>
                            </div>
                            <div className="flex gap-2 items-center">
                                <Globe strokeWidth={1} size={20} />{" "}
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
                            <div className="text-gray-600 text-xs mx-4">or</div>
                            <div className="flex-1 border-t" />
                        </div>

                        <h4 className="font-bold text-2xl px-2">
                            {course.price !== "0.00"
                                ? (<> ₦{parseInt(course.price).toLocaleString()}</>)
                                : <span className='text-gray-700'>
                                    FREE COURSE
                                </span>}

                        </h4>

                        {isEnrolled
                            ? <div className='px-2'>
                                <Button
                                    disabled
                                    variant="secondary"
                                    className="w-full py-6 text-sm font-bold uppercase rounded shadow">
                                    Already enrolled
                                </Button>
                                <Link
                                    to={`/courses/${course.id}/learn`}
                                    className="mt-3 inline-block text-blue-500 text-center text-xs font-light uppercase w-full hover:underline underline-offset-2">
                                    Go to course
                                </Link>
                            </div>

                            : <EnrollCourse course={course} />
                        }
                    </div>
                </div>
            </section>
        </>
    )
}
