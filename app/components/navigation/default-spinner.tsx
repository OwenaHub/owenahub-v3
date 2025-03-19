import { Loader } from 'lucide-react'

export default function Spinner() {
    return (
        <div className='flex items-center gap-1 text-sm'>
            <Loader size={18} className='animate-spin' />
            <span className='animate-pulse'>loading...</span>
        </div>
    )
}
