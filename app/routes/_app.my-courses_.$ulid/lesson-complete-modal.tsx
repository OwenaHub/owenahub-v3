import { AlertDialog } from '@radix-ui/react-alert-dialog';
import { useSearchParams } from 'react-router';

import { useEffect, useMemo } from 'react';

import {
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle
} from '~/components/ui/alert-dialog';

const TITLES = [
    "Lesson completed 🎉",
    "Great job! 🚀",
    "You did it! 🌟",
    "Awesome work! 🙌",
    "Congratulations! 🏆"
];

const DESCRIPTIONS = [
    [
        "You crushed this lesson! 🎊",
        "Keep the energy going—you're unstoppable!"
    ],
    [
        "Another lesson bites the dust! 😎",
        "Your progress is on fire—keep blazing ahead!"
    ],
    [
        "High five for finishing this lesson! ✋",
        "Stay curious and let the adventure continue!"
    ],
    [
        "Lesson complete—you're leveling up! 🕹️",
        "Ready for the next epic quest?"
    ],
    [
        "You totally rocked it! 🤘",
        "Let’s ride this wave of awesomeness to the next lesson!"
    ]
];

export default function LessonCompleteModal() {
    const [params, setParams] = useSearchParams();

    const randomIndex = useMemo(() => {
        if (String(params.get('completed')) === 'true') {
            return Math.floor(Math.random() * TITLES.length);
        }
        return 0;
    }, [params.get('completed')]);

    useEffect(() => {
        if (params.get('completed') !== 'true') {
            const lessonId = params.get('lessonId');
            if (lessonId) {
                const el = document.getElementById(`lesson-${lessonId}`);
                if (el) {
                    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }
        }
    }, [params.get('completed')]);

    return (
        <>
            {String(params.get('completed')) === 'true' && (
                <AlertDialog open={true} onOpenChange={() => {
                    const newParams = new URLSearchParams(params);
                    newParams.delete('completed');
                    setParams(newParams);
                }}>
                    <AlertDialogContent className='bg-primary-bg border border-primary-theme'>
                        <AlertDialogHeader className='text-start'>
                            <AlertDialogTitle>
                                {TITLES[randomIndex]}
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                                <div className='flex flex-col gap-2'>
                                    {DESCRIPTIONS[randomIndex].map((line, i) => (
                                        <p key={i} className='text-sm'>{line}</p>
                                    ))}
                                </div>
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel
                                className='bg-[#315E8B] text-white hover:bg-[#315E8B] hover:text-white'
                                onClick={() => {
                                    setParams((prev) => {
                                        prev.delete('completed');
                                        return prev;
                                    });
                                }}
                            >
                                Continue
                            </AlertDialogCancel>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            )}
        </>
    )
}
