import { ChevronRight } from 'lucide-react'
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
        toast.warning(response.data.error || "Something went wrong");
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
        <div className='md:px-6'>
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

                <div className="bg-slate-100 col-span-1 md:col-span-4 w-full aspect-video group-hover:opacity-75 lg:aspect-auto lg:h-auto overflow-hidden">
                    <img
                        src={lesson.videoUrl
                            ? `${STORAGE_URL}/${lesson.videoUrl}`
                            : "/images/banners/default-course-img.png"}
                        alt={lesson.title}
                        className="h-full w-full object-cover"
                    />
                </div>
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
