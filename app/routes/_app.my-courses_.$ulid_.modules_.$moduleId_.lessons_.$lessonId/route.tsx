import { Check, ChevronLeft, RotateCw, X, Zap } from 'lucide-react'
import { Form, Link, redirect } from 'react-router'
import type { Route } from '../_app.my-courses_.$ulid_.modules_.$moduleId_.lessons_.$lessonId/+types/route'
import { toast } from 'sonner'
import { getLesson, markDone } from './get-lesson'
import { Button } from '~/components/ui/button'
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "~/components/ui/alert-dialog"

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "~/components/ui/accordion"

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
    try {
        const lesson: Lesson = await getLesson(params.ulid, params.moduleId, params.lessonId);
        return lesson;
    } catch ({ response }: any) {
        console.log(response);
        toast.warning(response.data.error || response.data.message || "Something went wrong");
        return redirect(`/my-courses/${params.ulid}`)
    }
}

export async function clientAction({ request, params }: Route.ClientActionArgs) {
    const formData = await request.formData();
    const credentials = Object.fromEntries(formData);

    try {
        await markDone(credentials);
        return redirect(`/my-courses/${params.ulid}/?moduleId=${params.moduleId}&lessonId=${params.lessonId}&completed=true`);
    } catch ({ response }: any) {
        toast.error("Oops!, action couldn't be done")
        const error: any = response?.data?.errors;
        return error;
    }
}

export default function ViewLesson({ loaderData, params }: Route.ComponentProps) {
    const lesson: Lesson = loaderData;

    return (
        <div className='md:px-6 mb-20'>
            <div className='mb-10'>
                <div className='mb-5 mt-10'>
                    <div className="mb-4">
                        <Link to={`/my-courses/${params.ulid}/?lessonId=${params.lessonId}`} aria-label="Go back" className="flex gap-1 text-xs items-center uppercase hover:underline hover:underline-offset-2">
                            <ChevronLeft size={18} strokeWidth={2} /> <span>Go back</span>
                        </Link>
                    </div>
                </div>

                {lesson.videoUrl && (
                    <div className="bg-slate-100 col-span-1 md:col-span-4 w-full aspect-video group-hover:opacity-75 lg:aspect-video lg:h-full overflow-hidden">
                        {lesson.videoUrl.includes("youtube.com") || lesson.videoUrl.includes("youtu.be") ? (
                            <iframe
                                src={`https://www.youtube.com/embed/${lesson.videoUrl.includes("youtube.com")
                                    ? new URLSearchParams(new URL(lesson.videoUrl).search).get("v")
                                    : lesson.videoUrl.split("youtu.be/")[1]?.split("?")[0]
                                    }`
                                }
                                title={lesson.title}
                                className="h-full w-full"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                onError={() => toast.error("An error occurred while loading the video.", {
                                    description: "Try reloading or contacting support.",
                                    action: {
                                        label: (<RotateCw size={18} />),
                                        onClick: () => window.location.reload(),
                                    },
                                })}
                            />
                        ) : ("Video unavailable — report this to support@owenahub.com")}
                    </div>
                )}
            </div>

            <div className="flex flex-col gap-2 items-start mb-10">
                <p>Lesson {lesson.position}</p>
                <h1 className="text-2xl md:text-3xl font-bold mb-5">
                    {lesson.title}
                </h1>

                <div id="course-content">
                    <div dangerouslySetInnerHTML={{ __html: lesson.content }} />
                </div>
            </div>

            <div className="my-8">
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button className='bg-[#315E8B] border border-[#1d3c5a] border-b-4 py-5 mx-auto w-full md:w-xs'>
                            <span className='uppercase font-light'>Finish lesson</span>
                            <Zap size={20} />
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader className='text-start'>
                            <AlertDialogTitle className='flex items-center justify-between'>
                                <div>Lesson Tasks</div>
                                <AlertDialogCancel className='rounded border-0 p-0 px-0'>
                                    <X size={14} />
                                </AlertDialogCancel>
                            </AlertDialogTitle>
                            <AlertDialogDescription className='font-light !text-black'>
                                Ensure to complete the following tasks before marking the lesson as complete:
                            </AlertDialogDescription>
                        </AlertDialogHeader>

                        <Accordion type="single" collapsible className="w-full">
                            {(lesson?.tasks ?? []).length > 0 ? (
                                lesson.tasks?.map((task: Task, index) => (
                                    <AccordionItem value={`item-${index + 1}`} key={task.id}>
                                        <>
                                            <AccordionTrigger className='bg-muted px-3 rounded font-semibold'>
                                                <div>
                                                    <div className="text-xs font-light">
                                                        Task {index + 1}
                                                    </div>
                                                    <div>{task.name}</div>
                                                </div>
                                            </AccordionTrigger>
                                            <AccordionContent className='pt-3 px-3 bg-gray-50'>
                                                <div id="course-content" className='text-xs'>
                                                    <div dangerouslySetInnerHTML={{ __html: task.instruction }} />
                                                </div>
                                            </AccordionContent>
                                        </>
                                    </AccordionItem>
                                ))
                            ) : (
                                <div className="text-sm text-muted-foreground py-2">
                                    No tasks available
                                </div>
                            )}
                        </Accordion>

                        <AlertDialogFooter className='flex flex-row gap-10 !justify-between'>
                            {lesson.completed
                                ? <Button
                                    disabled
                                    type="button"
                                    className="rounded bg-secondary text-secondary-foreground shadow flex items-center font-light w-max cursor-pointer"
                                >
                                    <span>Completed</span> <Check size={18} />
                                </Button>
                                : <Form method="POST">
                                    <input type="hidden" name="completed" value={1} />
                                    <input type="hidden" name="lessonId" value={lesson.id} />
                                    <Button
                                        className="rounded bg-primary-bg border hover:opacity-55 hover:bg-primary-bg border-primary-theme text-primary cursor-pointer flex items-center font-light w-full md:w-max px-6"
                                    >
                                        <span>
                                            Mark complete
                                        </span>
                                        <Check className="ml-1 text-primary-theme" size={16} strokeWidth={3} />
                                    </Button>
                                </Form>
                            }
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
        </div >
    )
}
