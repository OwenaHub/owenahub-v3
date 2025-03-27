import { ArrowRight } from "lucide-react"
import { Link } from "react-router"
import { truncateText } from "~/lib/texts"

export default function CourseModule({ modules }: any) {
    return (
        <div className="flex flex-col gap-3 mb-5">
            {modules.length
                ? modules.map((module: any) => (
                    <CourseModuleCard module={module} key={module.id} />
                ))
                : <p className="text-gray-500 text-sm w-max rounded pb-3">
                    Nothing here yet
                </p>
            }
        </div>
    )
}

function CourseModuleCard({ module }: any) {
    return (
        <div className="border border-gray-200 border-b-2 rounded-md">
            <div className="flex justify-between items-center gap-3 pe-2">
                <div>
                    <div className="ml-3 py-4">
                        <h3 className="font-semibold text-lg">{module.title}</h3>
                        <p className="text-sm text-gray-500">{truncateText(module.description, 100)}</p>
                    </div>
                </div>
                <Link to={`modules/${module.id}/lessons`} className="text-blue-600 p-3 rounded-full border">
                    <ArrowRight />
                </Link>
            </div>
        </div>
    )
}