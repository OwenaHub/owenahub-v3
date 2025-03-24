import { ArrowRight } from "lucide-react"
import { Link } from "react-router"
import { STORAGE_URL } from "~/lib/keys"
import { truncateText } from "~/lib/texts"

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
                    <div className="aspect-video h-24 bg-gray-200 rounded-md hidden lg:block">
                        <img
                            title={course.title}
                            src={course.thumbnail
                                ? `${STORAGE_URL}/${course.thumbnail}`
                                : "/images/banners/default-course-img.png"}
                            className="w-full h-full object-cover rounded-l-md"
                        />
                    </div>
                    <div className="ml-3 py-4">
                        <h3 className="font-semibold md:text-lg">{course.title}</h3>
                        <p className="text-sm md:text-base text-gray-500 font-light">{truncateText(course.about, 1000)}</p>
                    </div>
                </div>
                <Link to={course.id} className="text-blue-600 p-3 rounded-full border">
                    <ArrowRight />
                </Link>
            </div>
        </div>
    )
}