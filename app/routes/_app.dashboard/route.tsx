import { ChevronRight, Headset, SearchCheck } from "lucide-react";
import { Link, type MetaFunction } from "react-router";
import { Button } from "~/components/ui/button";

export const meta: MetaFunction = () => {
    return [
        { title: "Dashboard | OwenaHub" },
        { name: "description", content: "The Learner's Hub" },
    ];
};

export default function Dashboard() {
    return (
        <section className="md:px-10 mt-10">
            <div className="justify-between gap-5 items- md:flex">
                <div>
                    <div className="mb-8">
                        <h1 className="text-primary text-xl font-bold mb-3 md:mt-20 md:text-2xl">
                            Start your learning journey today!
                        </h1>
                        <p className="text-sm leading-7">
                            Join hundreds of students who have changed their lives with tech.
                        </p>
                    </div>

                    <Link to="/courses" viewTransition>
                        <Button className="text-sm font-bold bg-[#fff7eb] border border-primary-theme text-secondary-foreground uppercase hover:bg-white transition w-full rounded md:w-max px-5 py-5 md:py-0">
                            buy now
                        </Button>
                    </Link>
                </div>

                <div className="hidden md:block">
                    <img
                        src="/images/schedule.svg"
                        alt="Home Page Mockup"
                        className="w-4/5 object-cover"
                    />
                </div>
            </div>

            <hr className="my-10" />

            <div>
                <div className="mb-5">
                    <h4 className="text-primary text-xl font-bold mb-3 md:mt-20">
                        Not quite ready?
                    </h4>
                    <p className="text-sm leading-7">
                        No problem! Prepare with our collection of reference materials and practice exercises.
                    </p>
                </div>

                <div className="flex flex-col gap-6 md:flex-row md:items-stretch pb-10">
                    <div className="flex shadow flex-1 border p-5 rounded-xl gap-3 items-center">
                        <div>
                            <Headset size={40} strokeWidth={1} />
                        </div>
                        <div>
                            <h5 className="text-gray-600 font-bold mb-2">Talk to a mentor</h5>
                            <p className="text-sm">
                                <a href="tel:+2348026658956" className="flex text-xs font-light gap-1 items-center uppercase">
                                    <span>Make a call </span> <ChevronRight strokeWidth={3} size={12} />
                                </a>
                            </p>
                        </div>
                    </div>
                    <div className="flex shadow flex-1 border p-5 rounded-xl gap-3 items-center">
                        <div>
                            <SearchCheck size={40} strokeWidth={1} />
                        </div>
                        <div>
                            <h5 className="text-gray-600 font-bold mb-2">Learn about the program</h5>
                            <p className="text-sm">
                                <a href="https://youtu.be/hBDECFvIk8w?si=G_1qfFhyCYJWwVv8" className="flex text-xs font-light gap-1 items-center uppercase">
                                    <span>Learn more </span> <ChevronRight strokeWidth={3} size={12} />
                                </a>
                            </p>
                        </div>
                    </div>

                </div>
            </div>

        </section>
    )
}
