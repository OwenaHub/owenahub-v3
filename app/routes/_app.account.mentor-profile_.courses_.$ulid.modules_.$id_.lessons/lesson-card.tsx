import { ArrowRight } from "lucide-react";
import { Link } from "react-router";
import { truncateText } from "~/lib/texts";

export default function LessonCard({ lesson }: any) {
    return (
        <div className="border border-gray-200 border-b-2 rounded-md">
            <div className="flex justify-between items-center gap-3 pe-2">
                <div>
                    <div className="ml-3 py-4">
                        <h3 className="font-semibold text-lg">{lesson.title}</h3>
                        <p className="text-sm text-gray-500">{truncateText(lesson.description, 80)}</p>
                    </div>
                </div>
                <Link to={`${lesson.id}`} className="text-blue-600 p-3 rounded-full border">
                    <ArrowRight />
                </Link>
            </div>
        </div>
    )
}