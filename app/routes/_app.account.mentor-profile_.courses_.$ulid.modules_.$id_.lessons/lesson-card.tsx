import { Pencil, Plus, Trash } from "lucide-react"
import { Link, useFetcher } from "react-router"
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
import { Button } from "~/components/ui/button"

export default function LessonCard({ lesson }: { lesson: Lesson }) {
    let fetcher = useFetcher()
    return (
        <div className="border border-gray-200 border-b-2 py-4 rounded-md">
            <div className="flex justify-between items-center gap-3 pe-2">
                <div>
                    <div className="ml-3">
                        <p className="text-sm font-light">
                            Lesson {lesson.position}
                        </p>
                        <h3 className="font-semibold text-lg mb-2">{lesson.title}</h3>
                        <section className="flex items-center gap-2">
                            {(lesson?.tasks ?? []).length < 2 && (
                                <Link to={`${lesson.id}/tasks/create`} className="flex items-center gap-1 border rounded-full w-max px-2 py-1 text-xs hover:bg-gray-100 transition">
                                    <span>Add task</span>
                                    <Plus size={14} />
                                </Link>
                            )}

                            <span className="flex items-center gap-4">
                                {lesson.tasks?.map((task: Task) => (
                                    <div className="flex items-center gap-1">
                                        <Link key={task.id} to={`${lesson.id}/tasks/${task.id}/edit`} className="flex items-center gap-1 rounded-full w-max px-2 py-1 text-xs bg-sky-100 outline outline-sky-600 hover:bg-gray-100 transition">
                                            <span>{task.name}</span>
                                        </Link>
                                        <fetcher.Form
                                            method="POST"
                                            title="Delete task"
                                            action={`${lesson.id}/tasks/${task.id}/delete`}
                                            className="rounded-full px-1.5 py-0.5 bg-red-50 hover:bg-red-100 text-destructive cursor-pointer"
                                        >
                                            <button type="submit" title="Delete task">
                                                <Trash size={16} className="relative top-0.5" />
                                            </button>
                                        </fetcher.Form>
                                    </div>
                                ))}
                            </span>
                        </section>
                    </div>
                </div>
                <div className="flex items-stretch gap-4">
                    <Link to={`${lesson.id}/edit`} className="text-sm font-light mt-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-full p-2 w-max transition cursor-pointer">
                        <Pencil size={18} />
                    </Link>
                    <DeleteDialog lesson={lesson} />
                </div>
            </div>
        </div>
    )
}

export function DeleteDialog({ lesson }: { lesson: Lesson }) {
    const fetcher = useFetcher();

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <span className="text-sm font-light mt-2 bg-red-100 hover:bg-red-100 text-destructive rounded-full p-2 w-max transition cursor-pointer">
                    <Trash size={18} />
                </span>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Delete this lesson?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently{" "}
                        <span className="font-semibold">delete this lesson</span> your data from our servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <fetcher.Form
                        method="POST"
                        action={`${lesson.id}/delete`}
                        className="rounded-full hover:bg-gray-100 cursor-pointer"
                    >
                        <Button
                            type="submit"
                            disabled={fetcher.state !== "idle"}
                            className="bg-destructive w-full text-white px-4 py-2 rounded-md"
                        >
                            Delete
                        </Button>
                    </fetcher.Form>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
