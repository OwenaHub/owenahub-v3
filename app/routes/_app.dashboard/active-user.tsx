import { ArrowRight, BookMarked } from 'lucide-react';
import { useMemo } from 'react'

export default function ActiveUser({ user }: { user: User }) {
    const GREETINGS = [
        "Welcome back",
        "Great to see you",
        "Ready to learn?",
        "Let's achieve greatness",
        "Wagwan",
        "Keep pushing forward",
        "How far",
        "Let's make today productive",
        "Stay curious",
        "Keep up the great work"
    ];

    const greeting = useMemo(() =>
        GREETINGS[Math.floor(Math.random() * GREETINGS.length)], []
    );

    return (
        <>
            <div className="mb-10">
                <h1 className="text-primary text-xl font-bold mb-3 md:mt-20 md:text-2xl">
                    {greeting}, <span className="text-[#F6A700]">{user.name.split(" ")[0]}</span> 👋
                </h1>
                <p className="text-sm leading-7">
                    Join hundreds of students who have changed their lives with tech.
                </p>
            </div>

            <div className="flex md:flex-row flex-col items-stretch gap-5">
                <div className="basis-4/6 rounded-2xl bg-primary-bg border border-amber-100 p-5 flex flex-col justify-between min-h-50 gap-2 text-primary-theme">
                    <div className="flex gap-2 items-center">
                        <BookMarked />
                        <span>Lesson 13</span>
                    </div>
                    <h2 className="text-2xl font-bold">Introduction to React</h2>
                </div>

                <div className="basis-2/6 border border-green-200 p-3 flex flex-col bg-green-100 justify-between rounded-2xl">
                    <div className="pb-2">
                        <p className="font-bold text-base mb-3">Go to community</p>
                        <p className="text-sm pb-3">
                            Say something you want to learn, and get answers from the community.
                        </p>
                    </div>

                    <a
                        href="https://chat.whatsapp.com/CclgnpXKrZrEp9Bc4O98cd"
                        target="_blank"
                        className="text-xs block pb-2"
                        rel="noopener"
                    >
                        <button className="text-center flex items-center justify-center gap-2 bg-green-600 rounded text-white text-xs w-full font-bold px-4 py-3 uppercase hover:bg-green-500 hover:text-white transition cursor-pointer">
                            <span>Join Community</span>
                            <ArrowRight size={17} />
                        </button>
                    </a>
                </div>
            </div>
        </>
    )
}
