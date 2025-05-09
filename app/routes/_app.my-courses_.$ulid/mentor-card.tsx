import { Send } from 'lucide-react'
import CustomAvatar from '~/components/custom/custom-avatar'
import { AlertDialogHeader } from '~/components/ui/alert-dialog'
import { Button } from '~/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogTitle, DialogTrigger } from '~/components/ui/dialog'

export default function MentorCard({ user }: { user: User }) {
    return (
        <div>
            <Dialog>
                <DialogTrigger asChild>
                    <div className='flex items-center gap-2'>
                        <CustomAvatar name={user?.name} styles='h-12 w-12' />
                        <div className="">
                            <div className='font-light text-xs'>Course mentor</div>
                            <div className='text-[#315E8B] font-bold underline underline-offset-2'>
                                {user?.name}
                            </div>
                        </div>
                    </div>
                </DialogTrigger>

                <DialogContent className="sm:max-w-[425px]">
                    <AlertDialogHeader>
                        <DialogTitle>
                            <section className='flex gap-2 items-center'>
                                <CustomAvatar name={user?.name} styles='h-12 w-12' />
                                <div className='text-start'>
                                    <div>{user?.name}</div>
                                    <div className='text-primary font-light text-sm'>
                                        @{user?.username}
                                    </div>
                                </div>
                            </section>
                        </DialogTitle>
                        <DialogDescription className='text-start mt-2'>
                            <div className="p-3 rounded  border-s-2 border border-sky-800 bg-sky-100 text-sky-800 text-sm mt-2">
                                <ul>
                                    <li className='list-disc mb-1 list-item'>
                                        Keep your message brief and to the point.
                                    </li>
                                    <li className='list-disc mb-1 list-item'>
                                        Ensure to be polite and respectful in your communication.
                                    </li>
                                    <li className='list-disc mb-1 list-item'>
                                        Avoid using jargon or overly complex language.
                                    </li>
                                </ul>
                            </div>
                        </DialogDescription>
                    </AlertDialogHeader>

                    <DialogFooter>
                        <Button className='rounded flex items-center gap-2' type="button" variant={'outline'}>
                            <a href="mailto:ernestharuna1@gmail.com">
                                Send an Email
                            </a>
                            <Send size={16} />
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}
