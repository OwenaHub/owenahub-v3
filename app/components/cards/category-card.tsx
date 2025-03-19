import { Star } from "lucide-react"

export default function CategoryCard({ course }: any) {
    return (
        <div className="mb-3 p-3 border rounded">
            <div className="card h-full border-0 rounded-2xl relative">
                <div className="mb-2 font-semibold">
                    {course.name}
                </div>
                <div className="flex items-center gap-2 pb-3">
                    <div className="text-sm">{course.rating}</div>
                    <div className="flex items-center gap-0.5">
                        <Star size={14} fill="#FFC800" />
                        <Star size={14} fill="#FFC800" />
                        <Star size={14} fill="#FFC800" />
                        <Star size={14} fill="#FFC800" />
                        <Star size={14} fill="#FFC800" />
                    </div>
                </div>
                <div className="px-2 py-1 text-xs rounded-full bg-[#FFE1BC] inline-block">{course.duration}</div>
            </div>
        </div>
    );
}
