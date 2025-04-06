import { ChevronRight, RotateCw } from 'lucide-react'
import { Form, Link, redirect, useParams } from 'react-router'
import type { Route } from '../_app.my-courses_.$ulid_.modules_.$moduleId_.lessons_.$lessonId/+types/route'
import { truncateText } from '~/lib/texts'
import { toast } from 'sonner'
import { getLesson, markDone } from './get-lesson'
import { STORAGE_URL } from '~/lib/keys'
import { Button } from '~/components/ui/button'

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
    try {
        const lesson = await getLesson(params.ulid, params.moduleId, params.lessonId);
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
        toast.success("Great Job! 🔥", {
            description: "Keep up the effort"
        })
        return redirect(`/my-courses/${params.ulid}`);
    } catch ({ response }: any) {
        toast.error("Oops!, action couldn't be done")
        const error: any = response?.data?.errors;
        return error;
    }

}

export default function ViewLesson({ loaderData }: Route.ComponentProps) {
    const lesson: Lesson = loaderData;
    const params = useParams();

    return (
        <div className='md:px-6 mb-20'>
            <div className='mb-14'>
                <div className='flex text-xs md:text-sm items-center gap-2 tex-sm mb-10 mt-10'>
                    <Link to="/my-courses" className='flex text-nowrap items-center gap-2 hover:underline underline-offset-1'>
                        <span>My courses</span> <ChevronRight size={16} />
                    </Link>
                    <Link to={`/my-courses/${params.ulid}`} className='flex text-nowrap items-center gap-2'>
                        ... <ChevronRight size={16} />
                    </Link>
                    <div className='text-nowrap'>
                        {truncateText(lesson.title)}
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
                        ) : (
                            <img
                                src={`${STORAGE_URL}/${lesson.videoUrl}`}
                                alt={lesson.title}
                                className="h-full w-full object-cover"
                                onError={(e) => {
                                    e.currentTarget.src = "/fallback-image.jpg";
                                    toast.error("An error occurred while loading the image.");
                                }}
                            />
                        )}
                    </div>
                )}
            </div>

            <div className="flex flex-col gap-2 items-start mb-10">
                <h1 className="text-2xl md:text-3xl font-bold">
                    {lesson.title}
                </h1>

                <div id="html-content">
                    <div dangerouslySetInnerHTML={{ __html: lesson.content }} />
                </div>
            </div>

            <div className="my-8">
                {lesson.completed
                    ? <Button
                        disabled
                        type="button"
                        className="bg-secondary text-primary shadow font-light w-full md:w-max px-6 rounded-full"
                    >
                        Completed
                    </Button>
                    : <Form method="POST">
                        <input type="hidden" name="completed" value={1} />
                        <input type="hidden" name="lessonId" value={lesson.id} />
                        <Button className="font-light w-full md:w-max px-6 rounded-full" variant="outline">
                            Mark complete <span className="text-xs">🎉</span>
                        </Button>
                    </Form>
                }
            </div>
        </div>
    )
}
