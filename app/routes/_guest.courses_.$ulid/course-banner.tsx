import { Calendar, Globe } from 'lucide-react'
import Rating from '~/components/custom/rating'
import { STORAGE_URL } from '~/lib/keys'
import dayjs from "dayjs";
import { Button } from '~/components/ui/button';
import { Link } from 'react-router';
import EnrollCourse from './enroll-course';
import { BrMd } from '~/components/utility/line-break';
import SharePage from '~/components/navigation/share-page';

export default function CourseBanner({ course, isEnrolled }: { course: Course, isEnrolled: boolean }) {
    let image = course.thumbnail
        ? `${STORAGE_URL}/${course.thumbnail}`
        : "/images/banners/default-course-img.png"

    return (
        <>
            {/* Desktop banner */}
            <section
                className="bg-muted py-20 hidden lg:block"
                style={{
                    // backgroundImage: `linear-gradient(rgba(50, 50, 50, 0.9), rgba(40, 40, 40, 0.5)), url(${image})`,
                    backgroundImage: `linear-gradient(90deg, #16161dce ,#16161D), url(${image})`,
                    backgroundSize: 'cover, cover',
                    backgroundPosition: 'center, center',
                }}
            >
                <div className="container flex items-center mt-8 gap-10">
                    <div className="flex flex-1 flex-col gap-6 items-start text-white">
                        <h1 className="text-xl md:text-5xl font-bold">
                            {course.title}
                        </h1>
                        <p className='text-lg'>{course.about}</p>
                        <div className="flex items-center gap-2 font-semibold">
                            <span className="text-primary-theme">5.0</span>
                            <Rating />
                            <span>(99+ ratings) 2,394 students</span>
                        </div>
                        <div>
                            Created by {" "}
                            <Link to="#creator" className="text-primary-theme underline underline-offset-2">
                                {course.creator?.name}
                            </Link>
                        </div>
                        <div className="flex gap-6 items-center">
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
                                <span>English</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white flex-1 w-full shadow-2xl rounded-md aspect-video overflow-hidden">
                        <img
                            src={course.thumbnail
                                ? `${STORAGE_URL}/${course.thumbnail}`
                                : "/images/banners/default-course-img.png"}
                            alt={course.title}
                            className="h-auto w-full object-cover"
                        />
                    </div>

                    {/* Side sticky */}

                </div>
            </section>

            {/* Mobile Banner */}
            <section className='lg:hidden'>
                <div className="bg-slate-100 col-span-1 md:col-span-4 h-60 w-full aspect-video group-hover:opacity-75 lg:h-auto overflow-hidden">
                    <img
                        src={course.thumbnail
                            ? `${STORAGE_URL}/${course.thumbnail}`
                            : "/images/banners/default-course-img.png"}
                        alt={course.title}
                        className="h-60 w-full object-cover"
                    />
                </div>

                <div className='container mt-7'>
                    <div className="flex flex-col gap-3 items-start mb-14">
                        <h1 className="text-2xl leading-7 md:text-3xl font-extrabold">
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
                            <Link to="#creator" className="text-primary-theme underline underline-offset-2">
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

                    <div className="bg-white text-xl font-bold flex flex-col gap-2">
                        <h4 className="font-bold text-2xl">
                            {course.price !== "0.00"
                                ? (<section>
                                    <div className='flex gap-2 items-center mb-1'>
                                        <div className='font-extrabold'>
                                            ₦{parseInt(course.price).toLocaleString()}
                                        </div>
                                        <p className="font-light text-gray-500 text-base line-through">₦{(parseInt(course.price) + 12000).toLocaleString()}</p>
                                    </div>
                                    <p className="text-destructive text-sm">
                                        <span className='font-bold'>Limited offer,</span>{" "}
                                        <span className='font-light'>
                                            expiring soon
                                        </span>
                                    </p>
                                </section>)
                                : <section className="flex items-center gap-4 mb-1">
                                    <span className='text-white p-2 bg-primary-theme rounded font-bold text-sm'>
                                        FREE COURSE
                                    </span>
                                    <p className="text-destructive text-sm leading-4">
                                        <div className='font-bold'>Limited offer</div>
                                        <div className='font-light'>
                                            Expiring soon
                                        </div>
                                    </p>
                                </section>}

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
                                    to={`/my-courses/${course.id}`}
                                    className="mt-3 inline-block text-blue-500 text-center text-xs font-light uppercase w-full hover:underline underline-offset-2">
                                    Go to course
                                </Link>
                            </div>

                            : <EnrollCourse course={course} />
                        }

                        <div className="flex items-center py-5">
                            <div className="flex-1 border-t" />
                            <div className="text-gray-600 text-xs mx-4">or</div>
                            <div className="flex-1 border-t" />
                        </div>

                        <div className="mb-4">
                            <h3 className="font-semibold text-gray-800 mb-2">
                                Subscribe to OwenaHub's top courses
                            </h3>

                            <p className="text-sm font-light">
                                Get this course, plus all of our top-rated courses, with Personal Plan.
                            </p>
                        </div>
                        <Button className="w-full rounded py-6 text-lg mb-2">
                            Try personal plan today
                        </Button>
                        <div className="text-center text-xs max-w-xl font-light">
                            Starting at ₦2,500 per month after trial
                            Cancel anytime
                        </div>





                        <div className='my-3 !text-lg'>
                            <SharePage />
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
