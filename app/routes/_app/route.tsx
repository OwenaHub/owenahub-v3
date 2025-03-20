import { Link, Outlet, redirect, useNavigation } from 'react-router'
import AppName from '~/components/custom/app-name'
import MobileNav from '~/components/navigation/mobile-nav'
import NavButton from '~/components/navigation/nav-button'
import APP_TABS from '~/components/navigation/app-tabs'
import useSession from '~/lib/session'
import type { Route } from '../_app/+types/route'
import { toast } from 'sonner'
import CustomAvatar from '~/components/custom/custom-avatar'
import AppNotification from './app-notification'
import { getNotifications } from './app'

export async function clientLoader() {
    const { validateSession, intendedRoute } = useSession();

    try {
        const user = await validateSession();
        const notifications = getNotifications();

        return { user, notifications };
    } catch ({ response }: any) {
        
        if (response.status === 401) {
            console.log(response);
            toast.error("Your session has expired!", {
                description: "Login again to continue using OwenaHub",
            })
        } else {
            toast.error("Something went wrong", {
                action: {
                    label: "Reload",
                    onClick: () => window.location.reload(),
                },
            })
        }

        intendedRoute(window.location.pathname);
        return redirect('/login');
    }
}

export default function ProtectedLayout({ loaderData }: Route.ComponentProps) {
    const { state } = useNavigation();
    let busy: boolean = state === "submitting" || state === "loading";

    const { user, notifications }: { user: User, notifications: any } = loaderData;

    return (
        <>
            <div className="container mx-auto p">
                <section className="flex flex-col md:flex-row min-h-screen">
                    <aside className="border-e hidden max-h-screen md:basis-1/5 md:block pr-5 py-6 sticky top-0">
                        <div className="flex flex-col h-full justify-between">
                            <div id='nav-container'>
                                <div className="flex justify-between items-center">
                                    <Link to={"/"} className='flex gap-1 items-center'>
                                        <img src='/images/logos/logo.png' width={25} title="OwenaHub" /> <AppName size='base' />
                                    </Link>

                                    <AppNotification notifications={notifications} />
                                </div>
                                <nav className="text-sm py-8 uppercase">
                                    {APP_TABS.map((item) => (
                                        <NavButton key={item.href} href={item.href} label={item.title} icon={item.icon} />
                                    ))}
                                </nav>
                            </div>
                            <section>
                                <div className="border p-3 rounded-md text-sm mb-4">
                                    <div className="text-base font-bold pb-2">Upgrade to premium</div>
                                    <p className="text-xs pb-3">
                                        Get full access to all courses offered on OwenaHub with a one time payment.
                                    </p>
                                    <button className="bg-white border border-b-2 rounded-md text-primary-foreground text-xs w-full font-bold px-4 py-2 uppercase">
                                        Subscribe
                                    </button>
                                </div>
                                <div className="rounded-md text-sm py-3">
                                    <div className="flex gap-2 items-start">
                                        <CustomAvatar name={user?.name} />
                                        <div>
                                            <h3 className="text-[#001836] font-bold">{user?.name}</h3>
                                            <p className="text-black text-xs">{user?.email}</p>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </aside>

                    <main className="flex-1 w-full transition">
                        <header className='flex justify-between items-center md:hidden py-5'>
                            <div className='flex gap-1 items-center'>
                                <img src='/images/logos/logo.png' width={25} title='OwenaHub' /> <AppName size='base' />
                            </div>
                            <AppNotification notifications={notifications} />
                        </header>
                        <div className={`${busy && "opacity-35"} transition overflow-x-hidden`}>
                            <Outlet context={user} />
                        </div>
                    </main>
                </section>
            </div>
            <div className='md:hidden pt-20'>
                <MobileNav />
            </div>
        </>
    )
}