import { ArrowRight, Trash } from "lucide-react"
import { Link, useFetcher } from "react-router"
import { STORAGE_URL } from "~/lib/keys"
import { truncateText } from "~/lib/texts"

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

export default function Course({ courses }: { courses: Course[] }) {
    return (
        <div className="flex flex-col gap-3">
            {courses.length
                ? courses.map((course: any) => (
                    <CourseCard course={course} key={course.id} />
                ))
                : <p className="text-gray-500 text-sm border px-3 py-1.5 w-max rounded">Nothing here yet</p>
            }
        </div>
    )
}

function CourseCard({ course }: { course: Course }) {
    return (
        <div className="border border-gray-200 border-b-2 rounded-md">
            <div className="flex justify-between items-center pe-2">
                <div className="flex items-center gap-4">
                    <div className="aspect-video h-32 bg-gray-200 rounded-md hidden lg:block">
                        <img
                            title={course.title}
                            src={course.thumbnail
                                ? `${STORAGE_URL}/${course.thumbnail}`
                                : "/images/banners/default-course-img.png"}
                            className="w-full h-full object-cover rounded-l-md"
                        />
                    </div>
                    <div className="ml-3 py-2">
                        <h3 className="font-semibold md:text-md">{course.title}</h3>
                        <p className="text-sm md:text-base text-gray-500 font-light mb-1">
                            {truncateText(course.about, 80)}
                        </p>
                        <div className="flex items-stretch gap-2">
                            <DeleteDialog course={course} />
                            <span className="text-sm font-light mt-2 border rounded-full px-3 py-1 w-max">
                                {course.modules.length} modules
                            </span>
                        </div>
                    </div>
                </div>
                <Link to={course.id} className="text-blue-600 p-3 rounded-full border">
                    <ArrowRight />
                </Link>
            </div>
        </div>
    )
}

export function DeleteDialog({ course }: { course: Course }) {
    const fetcher = useFetcher();

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <span className="text-sm font-light mt-2 bg-red-50 hover:bg-red-100 text-destructive rounded-full p-2 w-max transition cursor-pointer">
                    <Trash size={18} />
                </span>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently{" "}
                        <span className="font-semibold">delete this course and modules</span> your data from our servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <fetcher.Form
                        method="POST"
                        action={`${course.id}/delete`}
                        className="rounded-full hover:bg-gray-100 cursor-pointer"
                    >
                        <Button
                            type="submit"
                            disabled={fetcher.state !== "idle"}
                            className="bg-destructive text-white px-4 py-2 rounded-md"
                        >
                            Delete
                        </Button>
                    </fetcher.Form>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
