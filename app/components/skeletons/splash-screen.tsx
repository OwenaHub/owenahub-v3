import { useMemo } from 'react';
import { LoaderCircle } from 'lucide-react';

export default function SplashScreen() {
    const GREETINGS = [
        "every day is a chance to learn",
        "small steps lead to big achievements",
        "learning never stops",
        "stay motivated, stay curious",
        "progress, not perfection",
        "believe in your growth",
        "you’re building your future",
        "knowledge is your superpower"
    ];

    const greeting = useMemo(() =>
        GREETINGS[Math.floor(Math.random() * GREETINGS.length)], []
    );

    return (
        <div className='py-5 h-screen mx-auto flex flex-col items-center justify-center bg-primary-bg animated fadeIn'> 
            <div className="flex flex-col gap-3 mb-7 items-center">
                <img src="/images/logos/logo.png" alt="OwenaHub" width={50} className='' />
                <div className="text-center leading-3 flex flex-row items-center text-gray-700">
                    <span className="ms-2 text-xs font-normal animate-pulse">LOADING</span>
                    <span className="animate-spin p-1">
                        <LoaderCircle size={12} strokeWidth={3} />
                    </span>
                </div>
                <div className='text-center text-xl font-bold text-gray-800'>
                    "..{greeting}"
                </div>
            </div>
        </div>
    )
}
