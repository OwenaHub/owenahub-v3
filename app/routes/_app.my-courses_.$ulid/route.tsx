import type { Route } from '../_app.my-courses_.$ulid/+types/route';
import { getCourse } from './get-course';
import { toast } from 'sonner';
import { Link, redirect } from 'react-router';
import { ArrowUpRight, Calendar, ChevronLeft, CircleCheck, Globe, SquarePlay, Text } from 'lucide-react';
import dayjs from 'dayjs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '~/components/ui/accordion';

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
                    <ChevronLeft size={16} />
                    <span>My courses</span>
                </Link>
            </div>

            <div className='md:px-[1.5rem] mt-7'>
                <div className="flex flex-col gap-2 items-start mb-5">
                    <h1 className="text-2xl md:text-3xl font-bold">
                        {course.title}
                    </h1>
                    <p className='text-base mb-4'>
                        {course.about}
                    </p>
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
                    <div className='text-sm my-4'>
                        Created by {" "}
                        <Link to="#" className="text-primary-theme underline underline-offset-2">
                            {course.creator?.name}
                        </Link>
                        <div>
                            <Link to={`/courses/${course.id}`} className="mt-2 flex gap-2 items-center text-sm text-primary-theme hover:underline underline-offset-2">
                                <span>See more</span>
                                <ArrowUpRight size={16} />
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="">
                    <h4 className="font-bold text-xl mb-4">Course content</h4>
                    <div className="text-sm font-light mb-4">
                        {course.modules.length} modules • {" "}
                        {course.modules.reduce((count, module) => count + module.lessons.length, 0)} lessons •
                        43h total length
                    </div>
                    <Accordion type="multiple" className="w-full border" defaultValue={course.modules.map((_, index) => `item-${index + 1}`)}>
                        {course.modules.map((module: Module, index) => (
                            <AccordionItem value={`item-${index + 1}`} key={module.id}>
                                <AccordionTrigger className="px-5 bg-muted rounded-none">{module.title}</AccordionTrigger>
                                <AccordionContent className="p-5 flex flex-col gap-4">
                                    {module.lessons.map((lesson: Lesson) => {
                                        const wordsPerMinute = 150; // Average reading speed
                                        const wordCount = lesson.content?.split(' ').length || 0;
                                        const estimatedMinutes = Math.ceil(wordCount / wordsPerMinute);

                                        return (
                                            <div key={lesson.id} className="text-sm my-1 font-light flex items-start justify-between">
                                                <div className="font-light flex justify-between w-full gap-3">
                                                    <Link to={`modules/${module.id}/lessons/${lesson.id}`}>
                                                        <h5 className='leading-4 mb-2'>{lesson.title}</h5>
                                                        <div className='flex gap-5 items-center text-xs text-gray-400'>
                                                            <p className='flex items-center gap-1'>
                                                                {lesson.videoUrl
                                                                    ? (<>
                                                                        <SquarePlay strokeWidth={1} size={18} />
                                                                        <span>Video lesson</span>
                                                                    </>
                                                                    )
                                                                    : (<>
                                                                        <Text strokeWidth={1} size={18} />
                                                                        <span>Text lesson</span>
                                                                    </>)
                                                                }
                                                            </p>
                                                            <p className='font-medium'>{estimatedMinutes}:00</p>
                                                        </div>
                                                    </Link>

                                                    <div className="">
                                                        {lesson.completed
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
                                                </div>
                                            </div>
                                        )
                                    }
                                    )}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </div>

        </div>
    )
}
