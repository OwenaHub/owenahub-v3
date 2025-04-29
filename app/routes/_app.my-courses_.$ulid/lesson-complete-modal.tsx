import { AlertDialog } from '@radix-ui/react-alert-dialog';
import { useSearchParams } from 'react-router';
import {
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle
} from '~/components/ui/alert-dialog';

export default function LessonCompleteModal() {
    const [params, setParams] = useSearchParams();

    return (
        <>
            {String(params.get('completed')) === 'true' && (
                <AlertDialog open={true} onOpenChange={() => {
                    const newParams = new URLSearchParams(params);
                    newParams.delete('completed');
                    setParams(newParams);
                }}>
                    <AlertDialogContent className='bg-primary-bg border border-primary-theme'>
                        <AlertDialogHeader>
                            <AlertDialogTitle>
                                Lesson completed 🎉
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                                <div className='flex flex-col gap-2'>
                                    <p className='text-sm font-light'>You have completed this lesson.</p>
                                    <p className='text-sm font-light'>Keep up the great work!</p>
                                </div>
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel
                                className='bg-[#315E8B] text-white hover:bg-[#315E8B] hover:text-white'
                                onClick={() => setParams((prev) => {
                                    prev.delete('completed');
                                    return prev;
                                })}
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
