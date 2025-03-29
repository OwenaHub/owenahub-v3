import { ArrowRight, Pencil, Trash } from "lucide-react"
import { Link, useFetcher } from "react-router"
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

export default function CourseModule({ modules }: { modules: Module[] }) {
    return (
        <div className="flex flex-col gap-3 mb-5">
            {modules.length
                ? modules.map((module: Module) => (
                    <CourseModuleCard module={module} key={module.id} />
                ))
                : <p className="text-gray-500 text-sm w-max rounded pb-3">
                    Nothing here yet
                </p>
            }
        </div>
    )
}

function CourseModuleCard({ module }: { module: Module }) {
    return (
        <div className="border border-gray-200 border-b-2 rounded-md">
            <div className="flex justify-between items-center gap-3 pe-2">
                <div>
                    <div className="ml-3 py-4">
                        <h3 className="font-semibold text-lg">{module.title}</h3>
                        <p className="text-sm text-gray-500">{truncateText(module.description, 100)}</p>
                        <div className="flex items-stretch gap-2">
                            <Link to={`modules/${module.id}/edit`} className="text-sm font-light mt-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-full p-2 w-max transition cursor-pointer">
                                <Pencil size={18} />
                            </Link>
                            <DeleteDialog module={module} />
                            <span className="text-sm font-light mt-2 border rounded-full px-3 py-1 w-max">
                                {module.lessons.length} lessons
                            </span>
                        </div>
                    </div>
                </div>
                <Link to={`modules/${module.id}/lessons`} className="text-blue-600 p-3 rounded-full border">
                    <ArrowRight />
                </Link>
            </div>
        </div>
    )
}

export function DeleteDialog({ module }: any) {
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
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently{" "}
                        <span className="font-semibold">delete this module and lessons</span> your data from our servers.
                        <Link to={`modules/${module.id}/delete`}>
                            linjk
                        </Link>
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <fetcher.Form
                        method="POST"
                        action={`modules/${module.id}/delete`}
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
