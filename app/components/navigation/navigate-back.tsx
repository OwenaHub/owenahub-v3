import { ChevronLeft } from 'lucide-react'
import { Link } from 'react-router'

export default function NavigateBack({ to = "#" }: { to: string }) {
    return (
        <div className="mb-4">
            <Link to={"/" + to} className="flex gap-1 text-xs items-center uppercase hover:underline hover:underline-offset-2">
                <ChevronLeft size={18} strokeWidth={2} /> <span>back</span>
            </Link>
        </div>
    )
}
