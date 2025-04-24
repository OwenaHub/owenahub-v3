import type { Route } from '../_app.my-courses_.$ulid/+types/route';
import { getCourse } from './get-course';
import { toast } from 'sonner';
import { Link, redirect } from 'react-router';
import { ChevronLeft, CircleCheck, Clock, SquarePlay, Text, Zap } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '~/components/ui/accordion';
import { Button } from "~/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "~/components/ui/dialog"
import CustomAvatar from '~/components/custom/custom-avatar';

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
            <div className='flex text-sm items-center gap-2 tex-sm mb-3 mt-10 md:px-5'>
                <Link to="/my-courses" className='flex text-nowrap items-center gap-2 hover:underline underline-offset-1'>
                    <ChevronLeft size={16} />
                    <span>My courses</span>
                </Link>
            </div>

            <div className='md:px-[1.5rem] mt-7'>
                <div className='bg-muted rounded text-muted-foreground px-4 py-6 sticky'>
                    <h1 className="text-2xl md:text-3xl font-bold mb-5">
                        {course.title}
                    </h1>
                    <div className="">
                        {course.modules && course.modules.length ? (
                            (() => {
                                const totalLessons = course.modules.reduce((total: number, module: any) => total + module.lessons.length, 0);

                                const completedLessons = course.modules.reduce((total: number, module: any) =>
                                    total + module.lessons.filter((lesson: any) => lesson.completed).length, 0);

                                const progressPercentage = Math.round((completedLessons / totalLessons) * 100);

                                return (
                                    <div className="">
                                        <div className="bg-white rounded-lg h-2 mb-2">
                                            <div
                                                className="bg-[#315E8B] h-2 rounded-lg"
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

                <div className=" items-start mb-5">
                    <div className='text-sm my-4'>
                        <Dialog>
                            <DialogTrigger asChild>
                                <div className='flex items-center gap-2'>
                                    <CustomAvatar name={course.creator?.name} styles='h-12 w-12' />
                                    <div className="">
                                        <div className='font-light text-xs'>Course mentor</div>
                                        <div className='text-[#315E8B] font-bold underline underline-offset-2'>
                                            {course.creator?.name}
                                        </div>
                                    </div>
                                </div>
                            </DialogTrigger>

                            <DialogContent className="sm:max-w-[425px]">
                                <DialogHeader>
                                    <DialogTitle>
                                        <section className='flex gap-2 items-center'>
                                            <CustomAvatar name={course.creator?.name} styles='h-12 w-12' />
                                            <div className='text-start'>
                                                <div>{course.creator?.name}</div>
                                                <div className='text-primary-theme font-light text-sm'>
                                                    @{course.creator?.username}
                                                </div>
                                            </div>
                                        </section>
                                    </DialogTitle>
                                    <DialogDescription className='text-start mt-2'>
                                        {course.creator?.biography}
                                    </DialogDescription>
                                </DialogHeader>

                                <DialogFooter>
                                    <Button type="button" variant={'secondary'}>
                                        <a href="mailto:ernestharuna1@gmail.com">
                                            Send an Email
                                        </a>
                                    </Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>

                <div className="">
                    <Accordion type="multiple" className="w-full" defaultValue={course.modules.map((_, index) => `item-${index + 1}`)}>
                        {course.modules.map((module: Module, index) => (
                            <AccordionItem value={`item-${index + 1}`} key={module.id} className='mb-5 border-0'>
                                <AccordionTrigger className="rounded-none">
                                    <div>
                                        <div className="text-sm font-light">Module {module.position}</div>
                                        <div className='text-base font-medium'>{module.title}</div>
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent className="flex flex-col gap-4 animated fadeIn">
                                    {module.lessons.map((lesson: Lesson) => {
                                        const wordsPerMinute = 150; // Average reading speed
                                        const wordCount = lesson.content?.split(' ').length || 0;
                                        const estimatedMinutes = Math.ceil(wordCount / wordsPerMinute);

                                        return (
                                            <div key={lesson.id} className="text-sm rounded p-4 bg-gray-50 border border-gray-100 flex items-start justify-between">
                                                <div className="flex justify-between items-center w-full gap-3">
                                                    <Link to={`modules/${module.id}/lessons/${lesson.id}`}>
                                                        <div className="font-light text-xs mb-1">Lesson {lesson.position}</div>
                                                        <h5 className='leading-4 mb-2'>{lesson.title}</h5>
                                                        <div className='flex gap-2 items-center text-xs'>
                                                            <p className='flex items-center gap-1 mr-4 text-gray-500'>
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
                                                            <div className='flex items-center gap-2 px-2 py-0.5 border border-gray-600 bg-gray-100 text-xs text-gray-600 rounded-full'>
                                                                <Clock size={14} />
                                                                <span>{estimatedMinutes}:00</span>
                                                            </div>
                                                            {(lesson.tasks && lesson.tasks?.length > 0) && (
                                                                <div className='flex items-center gap-1 px-2 py-0.5 border border-sky-800 bg-sky-100 text-xs text-sky-800 rounded-full'>
                                                                    <span>Task</span>
                                                                    <Zap size={14} />
                                                                </div>
                                                            )}
                                                        </div>
                                                    </Link>

                                                    <div className="">
                                                        {lesson.completed
                                                            ? <div className=''>
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
