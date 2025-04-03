import type { Route } from '../_app.my-courses_.$ulid/+types/route';
import { getCourse } from './get-course';
import { toast } from 'sonner';
import { Link, redirect } from 'react-router';
import { STORAGE_URL } from '~/lib/keys';
import Rating from '~/components/custom/rating';
import { Calendar, ChevronRight, CircleCheck, Globe, Youtube } from 'lucide-react';
import dayjs from 'dayjs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '~/components/ui/accordion';
import { truncateText } from '~/lib/texts';

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
    try {
        if (!params.ulid) throw new Error("Bad Request");
        const course = await getCourse(params.ulid);
        return { course }
    } catch ({ response }: any) {
        console.log(response)
        toast.info('Content unavailable')
        return redirect('/my-courses');
    }
}

export default function GetUserCourse({ loaderData }: Route.ComponentProps) {
    const { course }: { course: Course } = loaderData;

    return (
        <div className='mb-20'>
            <div className='flex text-sm items-center gap-2 tex-sm mb-10 mt-10 md:px-5'>
                <Link to="/my-courses" className='flex text-nowrap items-center gap-2 hover:underline underline-offset-1'>
                    <span>My courses</span> <ChevronRight size={16} />
                </Link>
                <div className='text-nowrap'>
                    {truncateText(course.title)}
                </div>
            </div>

            <div className="bg-slate-100 col-span-1 md:col-span-4 w-full aspect-video group-hover:opacity-75 lg:aspect-auto lg:h-auto overflow-hidden md:mx-5">
                <img
                    src={course.thumbnail
                        ? `${STORAGE_URL}/${course.thumbnail}`
                        : "/images/banners/default-course-img.png"}
                    alt={course.title}
                    className="h-full w-full object-cover"
                />
            </div>

            <div className='md:px-[1.5rem] mt-7'>
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

                    <div className="flex flex-col md:flex-row gap-3 text-sm">
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

                <div className="">
                    <h4 className="font-bold text-xl mb-4">Course content</h4>
                    <div className="text-sm font-light mb-4">
                        {course.modules.length} modules • {" "}
                        {course.modules.reduce((count, module) => count + module.lessons.length, 0)} lessons •
                        32h 23m total length
                    </div>
                    <Accordion type="single" collapsible defaultValue="item-1" className="w-full border">
                        {course.modules.map((module, index) => (
                            <AccordionItem value={`item-${index + 1}`} key={module.id}>
                                <AccordionTrigger className="px-5 bg-muted rounded-none">{module.title}</AccordionTrigger>
                                <AccordionContent className="p-5 flex flex-col gap-4">
                                    {module.lessons.map((lesson) => (
                                        <div key={lesson.id} className="text-sm my-1 font-light flex items-start justify-between">
                                            <div className="font-light flex items-center gap-3">
                                                {/* <Notebook strokeWidth={1} size={18} /> <span>{lesson.title}</span> */}
                                                <div className="">
                                                    {true
                                                        ? <div className='bg-green-200 rounded-full'>
                                                            <CircleCheck
                                                                className="text-white bg-green-0 fill-green-500 rounded-full p-0.5"
                                                                strokeWidth={1}
                                                                size={40}
                                                            />
                                                        </div>

                                                        : <CircleCheck
                                                            className="text-foreground rounded-full p-1"
                                                            strokeWidth={1}
                                                            size={40}
                                                        />}
                                                </div>
                                                <Link to={`modules/${module.id}/lessons/${lesson.id}`}>
                                                    <h5>{lesson.title}</h5>
                                                    <p className='text-xs text-gray-500 flex items-center gap-2'>
                                                        <Youtube strokeWidth={1} size={18} /> <span>Video available</span>
                                                    </p>
                                                </Link>

                                            </div>
                                            <div className='mt-1'>
                                                10:00 +
                                            </div>
                                        </div>
                                    ))}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </div>

        </div>
    )
}
