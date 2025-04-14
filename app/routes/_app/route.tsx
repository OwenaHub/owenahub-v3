import { Link, Outlet, redirect, useNavigation } from 'react-router'
import AppName from '~/components/custom/app-name'
import MobileNav from '~/components/navigation/mobile-nav'
import NavButton from '~/components/navigation/nav-button'
import APP_TABS from '~/components/navigation/app-tabs'
import useSession from '~/lib/session'
import type { Route } from './+types/route'
import { toast } from 'sonner'
import CustomAvatar from '~/components/custom/custom-avatar'
import AppNotification from './app-notification'
import { getNotifications } from './app'
import { ArrowRight } from 'lucide-react'

export async function clientLoader() {
    const { validateSession, intendedRoute } = useSession();

    try {
        const user = await validateSession();
        const notifications = getNotifications();

        return { user, notifications };
    } catch ({ response }: any) {

        if (response?.status === 401) {
            toast.warning("Your session has expired!", {
                description: "Login to continue using OwenaHub",
            })
        } else {
            toast.error("Something went wrong", {
                action: {
                    label: "Reload",
                    onClick: () => window.location.reload(),
                },
            })
        }
        // * Registers users intended route in sessionStorage
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
            <div className="container">
                <section className="flex flex-col md:flex-row min-h-screen">
                    <aside className="border-e hidden max-h-screen md:basis-1/5 md:block pr-5 py-6 sticky top-0">
                        <div className="flex flex-col justify-between">
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

                            {/* Lower section */}
                            <section>
                                <section>
                                    <div className="bg-slate-100 col-span-1 md:col-span-4 rounded-t w-full aspect-square group-hover:opacity-75 lg:aspect-auto lg:h-44 overflow-hidden">
                                        <img
                                            src="/images/banners/owenahub-community-banner.png"
                                            alt="Owenahub community"
                                            className="h-full w-full object-cover"
                                        />
                                    </div>
                                    <div className="border p-3 rounded text-sm mb-4">
                                        <div className="text-base font-bold pb-2">Join the community</div>
                                        <p className="text-xs pb-3">
                                            Our WhatsApp community is a great place to get updates and network with like minds
                                        </p>

                                        <a
                                            href="https://chat.whatsapp.com/CclgnpXKrZrEp9Bc4O98cd"
                                            target="_blank"
                                            className="text-xs block pb-2"
                                            rel="noopener"
                                        >
                                            <button className="text-center flex items-center justify-center gap-2 bg-green-100 border border-green-600 rounded text-green-600 text-xs w-full font-bold px-4 py-2 uppercase hover:bg-green-500 hover:text-white transition cursor-pointer">
                                                <span>Join Community</span>
                                                <ArrowRight size={17}/>
                                            </button>
                                        </a>
                                    </div>
                                </section>

                                <div className="p-3 rounded text-sm mb-4 bg-primary-bg">
                                    <div className="text-base font-bold pb-2">Upgrade to premium</div>
                                    <p className="text-xs pb-3">
                                        Get full access to all courses offered on OwenaHub with a one time payment.
                                    </p>
                                    <button className="bg-primary-theme rounded text-muted text-xs w-full font-bold px-4 py-2 uppercase">
                                        Subscribe
                                    </button>
                                </div>

                                <div className="rounded-md text-sm py-3">
                                    <div className="flex gap-2 items-center">
                                        <CustomAvatar name={user?.name} styles="w-[3rem] h-[3rem]" />
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