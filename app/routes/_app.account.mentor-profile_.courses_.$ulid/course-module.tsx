import { ArrowRight } from "lucide-react"
import { Link } from "react-router"
import { truncateText } from "~/lib/texts"

export default function CourseModule({ modules }: any) {
    return (
        <div className="flex flex-col gap-3">
            {modules.length
                ? modules.map((course: any) => (
                    <CourseModuleCard module={module} key={course.id} />
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
            <div className="flex justify-between items-center pe-2">
                <div>
                    <div className="ml-3 py-4">
                        <h3 className="font-semibold text-lg">{module.title}</h3>
                        <p className="text-sm text-gray-500">{truncateText(module.about)}</p>
                    </div>
                </div>
                <Link to={module.id} className="text-blue-600 p-3 rounded-full border">
                    <ArrowRight />
                </Link>
            </div>
        </div>
    )
}