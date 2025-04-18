import type { Route } from '../_app.my-courses_.$ulid/+types/route';
import { getCourse } from './get-course';
import { toast } from 'sonner';
import { Link, redirect } from 'react-router';
import { ArrowUpRight, ChevronLeft, CircleCheck, SquarePlay, Text } from 'lucide-react';
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
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"
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
                <div className="flex flex-col gap-2 items-start mb-5">
                    <section className='w-full'>
                        <div className='w-full bg-primary-theme rounded-t-lg text-white px-4 py-6'>
                            <h1 className="text-2xl md:text-3xl font-bold">
                                {course.title}
                            </h1>
                        </div>
                        <div className='w-full bg-primary-bg border border-primary-theme rounded-b-lg text-white px-4 py-6'>
                            <p className='text-base text-gray-600 md:flex items-center gap-2'>
                                <span>{course.about}</span>
                                <Link to={`/courses/${course.id}`} className="inline-block text-primary-theme hover:underline underline-offset-2">
                                    <ArrowUpRight size={18} />
                                </Link>
                            </p>
                        </div>
                    </section>

                    <div className='text-sm my-6'>
                        Course mentor {" "}

                        <Dialog>
                            <DialogTrigger asChild>
                                <Link to="#" className="text-primary-theme underline underline-offset-2">
                                    {course.creator?.name}
                                </Link>
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
                    {/* <h4 className="font-bold text-xl mb-4">Course content</h4> */}

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
