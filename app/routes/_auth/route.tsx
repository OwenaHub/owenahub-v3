import { Link, Outlet, redirect } from "react-router";
import type { Route } from "./+types/route";
import useSession from "~/hooks/use-session";

export async function clientLoader(_: Route.ClientLoaderArgs) {
    const { validateSession } = useSession();
    
    try {
        await validateSession();
        return redirect('/dashboard');
    } catch ({ response }: any) {
        return {};
    }
}

export default function AuthLayout(_: Route.ComponentProps) {
    return (
        <main>
            <header className="container flex justify-center py-4">
                <div className="flex gap-2 items-center">
                    <img width="30" className="inline-block" src="/images/logos/logo.png" title="OwenaHub" />
                    <Link to="/" className="text-popover-foreground">
                        <span className="font-extrabold">OwenaHub </span>
                        <span className="font-normal">the learners hub</span>
                    </Link>
                </div>
            </header>
            <div className="">
                <Outlet />
            </div>
        </main>
    )
}
