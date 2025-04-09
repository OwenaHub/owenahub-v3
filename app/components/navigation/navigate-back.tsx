import { ChevronLeft } from 'lucide-react'
import { useNavigate } from 'react-router'

export default function NavigateBack({ to = "back" }: { to?: string }) {
    const navigate = useNavigate();

    return (
        <div className="mb-4">
            <button onClick={() => navigate(-1)} aria-label="Go back" className="flex gap-1 text-xs items-center uppercase hover:underline hover:underline-offset-2">
                <ChevronLeft size={18} strokeWidth={2} /> <span>{to}</span>
            </button>
        </div>
    )
}
