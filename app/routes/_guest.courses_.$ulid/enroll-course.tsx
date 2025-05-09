import { Loader } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Form, Link, useNavigation } from 'react-router'
import { Button } from '~/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "~/components/ui/dialog"
import { Checkbox } from "~/components/ui/checkbox"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"
import useSession from '~/lib/session';


export default function EnrollCourse({ course }: { course: Course }) {
    let session;

    const [userSession, setUserSession] = useState(false)

    useEffect(() => {
        const { getUser } = useSession();

        const checkUser = async () => {
            try {
                const user = await getUser();

                if (user.id)
                    session = true;
                else
                    session = false;

                setUserSession(session);
            } catch ({ response }: any) {
                throw response;
            }
        };

        checkUser();
    }, []);

    return (
        <>
            {userSession
                ? <EnrollDialog course={course} />
                : <Link
                    to={"/register"}
                    className="bg-primary-theme hover:opacity-65 hover:bg-amber-500 text-primary font-semibold rounded py-3 px-1.5 text-center text-lg"
                >
                    Enroll now
                </Link>
            }
        </>
    )
}

function EnrollDialog({ course }: { course: Course }) {
    const navigation = useNavigation();
    const busy = navigation.formAction === `/courses/enroll/${course.id}`;
    const [checked, setChecked] = useState(false);

    return (
        <>
            {course.price !== "0.00"
                ? (
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button className="bg-primary-theme hover:opacity-65 hover:bg-amber-500 text-primary font-bold rounded py-6 text-lg">
                                Enroll now
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>Enter voucher code</DialogTitle>
                                <DialogDescription>
                                    <p className='mb-2'>
                                        Enter a voucher code to enrroll for this course
                                    </p>

                                    <div className="border text-sm px-2.5 py-2 bg-sky-100 border-sky-600 text-sky-900 rounded-md">
                                        Send a message to the {" "}
                                        <a href="mailto:ernestharuna1@gmail.com" className='font-bold underline underline-offset-1'>administrator</a>{" "}
                                        to purchase a voucher code.
                                    </div>
                                </DialogDescription>
                            </DialogHeader>
                            <Form
                                action={`/courses/enroll/${course.id}`}
                                method="POST"
                            >
                                <div className="pt-1 pb-4">
                                    <Label htmlFor="code" className="text-right mb-1">
                                        Enter code
                                    </Label>
                                    <Input id="code" name='code' className='rounded shadow' placeholder='XXX-XXX-XXX' required />
                                </div>

                                <Button className='rounded font-bold bg-[#fff7eb] border border-primary-theme text-secondary-foreground hover:bg-white transition uppercase w-full disabled:cursor-not-allowed' disabled={busy}>
                                    {busy
                                        ? <Loader size={18} className='animate-spin' />
                                        : "Submit code"
                                    }
                                </Button>
                            </Form>
                        </DialogContent>
                    </Dialog>

                ) : (
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button className="bg-primary-theme hover:opacity-65 hover:bg-amber-500 text-primary font-bold rounded py-6 text-lg">
                                Enroll now
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader className='text-left mb-4'>
                                <DialogTitle>Are you sure?</DialogTitle>
                                <DialogDescription>
                                    <p className='mb-2'>
                                        Enroll to <span className="font-semibold">{course.title}</span>?
                                    </p>

                                    <div className="border text-sm px-2.5 py-2 bg-sky-100 border-sky-600 text-sky-900 rounded-md">
                                        Ensure you have spoken with a mentor from OwenaHub before you enroll in this course. {" "}

                                        <p className="my-3 font-bold">
                                            Message Mentor via;
                                        </p>
                                        <div className="flex items-center gap-3">
                                            <a
                                                href="https://wa.me/message/YTN3LW4BSF6DC1"
                                                rel="noopener"
                                                target='_blank'
                                                className="p-2 flex-1 !text-center rounded bg-[#25D366] text-white flex items-center gap-1"
                                            >
                                                WhatsApp
                                            </a>
                                            <a href="mailto:ernestharuna1@gmail.com" className="p-2 flex-1 !text-center rounded bg-white border border-gray-500 text-black flex items-center gap-1">
                                                E-mail
                                            </a>
                                        </div>

                                    </div>

                                    <div className="flex items-center space-x-2 mt-5">
                                        <Checkbox id="terms" checked={checked} onCheckedChange={() => setChecked(!checked)} />
                                        <label
                                            htmlFor="terms"
                                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                        >
                                            Yes, I have contacted the mentor
                                        </label>
                                    </div>
                                </DialogDescription>
                            </DialogHeader>
                            <Form
                                action={`/courses/enroll/${course.id}`}
                                method="POST"
                            >
                                <Button
                                    className='rounded font-bold bg-[#fff7eb] border border-primary-theme text-secondary-foreground hover:bg-white transition uppercase w-full disabled:cursor-not-allowed'
                                    disabled={busy || !checked}
                                >
                                    {busy
                                        ? <Loader size={18} className='animate-spin' />
                                        : "Yes, enroll"
                                    }
                                </Button>
                            </Form>
                        </DialogContent>
                    </Dialog>
                )
            }
        </>
    )
}