import { EllipsisVertical, LogOut, } from "lucide-react";
import { Form, Outlet, useOutletContext, type MetaFunction } from "react-router"
import { Button } from "~/components/ui/button";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "~/components/ui/popover"

export const meta: MetaFunction = () => {
    return [
        { title: "Account | OwenaHub" },
        { name: "description", content: "The Learner's Hub" },
    ];
};

export default function AccountLayout() {
    const user: User = useOutletContext();

    return (
        <section className="md:px-10 mt-10">
            <div className=" md:mt-20 mb-8 flex justify-between items-start">
                <div>
                    <h4 className="text-2xl text-primary-theme mb-3 font-bold">
                        Account
                    </h4>
                    <p className="text-sm leading-7">
                        Account details and settings page
                    </p>
                </div>
            </div>
            <hr className="mb-5" />
            <section className="flex flex-row md:gap-10 justify-between gap-8 items-center pb-5">
                <div className="flex gap-4 items-center justify-between w-full">
                    <div className="pe-4">
                        <h5 className="text-sm text-secondary-foreground font-bold">
                            {user.name}
                        </h5>
                        <p className="text-sm leading-7">
                            {user.email}
                        </p>
                    </div>

                    <div className="bg-primary-bg border border-primary-theme cursor-pointer hover:bg-white p-1 rounded-md">
                        <Popover>
                            <PopoverTrigger asChild>
                                <EllipsisVertical />
                            </PopoverTrigger>
                            <PopoverContent className="w-80">
                                <Form method="POST" action="logout" className="cursor-pointer" title="logout">
                                    <Button variant="secondary" type="submit" className="rounded text-xs px-10 flex items-center gap-2 w-full">
                                        <span>Sign out</span>
                                        <LogOut className="text-destructive" strokeWidth={1} />
                                    </Button>
                                </Form>
                            </PopoverContent>
                        </Popover>
                    </div>
                </div>

            </section>

            <Outlet context={user} />
        </section >
    )
}
