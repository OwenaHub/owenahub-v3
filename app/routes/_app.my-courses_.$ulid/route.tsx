import type { Route } from '../_app.my-courses_.$ulid/+types/route';
import { getCourse } from './get-course';
import { toast } from 'sonner';
import { Link, redirect } from 'react-router';
import { CheckCheck, ChevronLeft, Clock, Send, SquarePlay, Text, Zap } from 'lucide-react';
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
import CerticateCard from '~/components/cards/certificate-card';
import LessonCompleteModal from './lesson-complete-modal';

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
    try {
        if (!params.ulid) throw new Error("Bad Request");
        const course = await getCourse(params.ulid);
        return { course }
    } catch ({ response }: any) {
        console.log(response)
        toast.info('Content unavailable', {
            description: response?.data?.error || response?.data?.message || 'Something went wrong',
        })
        return redirect('/my-courses');
    }
}

export default function GetUserCourse({ loaderData }: Route.ComponentProps) {
    const { course }: { course: Course } = loaderData;

    return (
        <div className='mb-20'>
            <LessonCompleteModal />

            <div className='flex text-sm items-center gap-2 tex-sm mb-3 mt-10 md:px-5'>
                <Link to="/my-courses" className='flex text-nowrap items-center gap-2 hover:underline underline-offset-1'>
                    <ChevronLeft size={16} />
                    <span>My courses</span>
                </Link>
            </div>

            <div className='md:px-[1.5rem] mt-7'>
                <div className='bg-muted rounded text-muted-foreground px-4 py-6 sticky'>
                    <h1 className="text-xl md:text-3xl font-bold mb-5">
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
                                        <div className="bg-white rounded h-3 mb-3">
                                            <div
                                                className="bg-[#315E8B] h-3 rounded"
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

                <div className="items-start mb-5">
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
                                                <div className='text-primary font-light text-sm'>
                                                    @{course.creator?.username}
                                                </div>
                                            </div>
                                        </section>
                                    </DialogTitle>
                                    <DialogDescription className='text-start mt-2'>
                                        <div className="p-3 rounded  border-s-2 border border-sky-800 bg-sky-100 text-sky-800 text-sm mt-2">
                                            <ul>
                                                <li className='list-disc mb-1 list-item'>
                                                    Keep your message brief and to the point.
                                                </li>
                                                <li className='list-disc mb-1 list-item'>
                                                    Ensure to be polite and respectful in your communication.
                                                </li>
                                                <li className='list-disc mb-1 list-item'>
                                                    Avoid using jargon or overly complex language.
                                                </li>
                                            </ul>
                                        </div>
                                    </DialogDescription>
                                </DialogHeader>

                                <DialogFooter>
                                    <Button className='rounded flex items-center gap-2' type="button" variant={'outline'}>
                                        <a href="mailto:ernestharuna1@gmail.com">
                                            Send an Email
                                        </a>
                                        <Send size={16} />
                                    </Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>

                <div className="">
                    <Accordion type="multiple" className="w-full" defaultValue={course.modules.map((_, index) => `item-${index + 1}`)}>
                        {course.modules.map((module: Module, index) => (
                            <AccordionItem value={`item-${index + 1}`} key={module.id} className='mb-5 border-0 border-b pb-5'>
                                <AccordionTrigger className="rounded-none">
                                    <div>
                                        <div className="text-sm font-light">Module {module.position}</div>
                                        <div className='text-base font-medium'>{module.title}</div>
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent className="flex flex-col gap-4 animated fadeIn">
                                    {module.lessons.map((lesson: Lesson, lessonIdx: number) => {
                                        const wordsPerMinute = 150; // Average reading speed
                                        const wordCount = lesson.content?.split(' ').length || 0;
                                        const estimatedMinutes = Math.ceil(wordCount / wordsPerMinute);

                                        // Find the index of the last completed lesson
                                        const lastCompletedIdx = module.lessons.map(l => l.completed).lastIndexOf(true);
                                        const isNextAfterCompleted = lessonIdx === lastCompletedIdx + 1 && !lesson.completed;

                                        return (
                                            <div key={lesson.id} className="text-sm rounded p-4 bg-gray-50 border border-gray-100">
                                                <div className="flex justify-between w-full gap-3">
                                                    <Link to={`modules/${module.id}/lessons/${lesson.id}`}>
                                                        <div className="font-light text-xs mb-1">Lesson {lesson.position}</div>
                                                        <h5 className='leading-4'>{lesson.title}</h5>
                                                        {!lesson.completed && (
                                                            <>
                                                                <div className='flex gap-2 items-center text-xs my-2.5'>
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
                                                                </div>

                                                                <div className='flex gap-2 items-center text-xs'>
                                                                    <div className='flex items-center gap-2 px-2 py-0.5 border border-gray-600 bg-gray-100 text-xs text-gray-600 rounded-full'>
                                                                        <Clock size={14} />
                                                                        <span>{estimatedMinutes}:00</span>
                                                                    </div>
                                                                    {(lesson.tasks && lesson.tasks?.length > 0) && (
                                                                        <div className='flex items-center gap-1 px-2 py-0.5 border border-sky-800 bg-sky-100 text-xs text-sky-800 rounded-full'>
                                                                            <span>Task</span>
                                                                            <Zap size={14} />
                                                                            <span>
                                                                                ({lesson.tasks?.length})
                                                                            </span>
                                                                        </div>
                                                                    )}
                                                                </div>

                                                            </>
                                                        )}

                                                    </Link>

                                                    <div className="">
                                                        {lesson.completed
                                                            && <CheckCheck className='text-green-500' strokeWidth={3} />
                                                        }
                                                    </div>
                                                </div>
                                                {isNextAfterCompleted && (
                                                    <Link to={`modules/${module.id}/lessons/${lesson.id}`}>
                                                        <Button
                                                            className="mt-3 px-8 w-full md:w-max bg-primary-bg border border-primary-theme hover:bg-white text-amber-800 font-semibold"
                                                        >
                                                            Start lesson
                                                        </Button>
                                                    </Link>
                                                )}
                                            </div>
                                        )
                                    }
                                    )}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>

                    <section>
                        <CerticateCard />
                    </section>
                </div>
            </div>

        </div >
    )
}
