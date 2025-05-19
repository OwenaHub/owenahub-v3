import { Await, Link, NavLink, Outlet, useNavigation } from "react-router";
import { ChevronRight, Facebook, Instagram, Menu, Twitter, X } from "lucide-react";
import { Suspense, useEffect, useState } from "react";
import type { Route } from "../_guest/+types/route";
import CustomAvatar from "~/components/custom/custom-avatar";
import useSession from "~/hooks/use-session";

export async function clientLoader(_: Route.ClientLoaderArgs) {
    const { getUser } = useSession();

    try {
        const user: User = await getUser();
        let session: boolean;

        if (user.name)
            session = true;
        else
            session = false;

        return { session, user };
    } catch ({ response }: any) {
        console.log(response)
    }
}

export default function GuestLayout({ loaderData }: Route.ComponentProps) {
    const { state } = useNavigation();
    let busy: boolean = state === "submitting" || state === "loading";

    const [menu, setMenu] = useState<boolean>(false);
    const [scrolled, setScrolled] = useState<boolean>(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const { session, user }: { session: boolean, user: User } = loaderData ?? { session: false, user: { name: "" } as User };

    return (
        <section className={`${busy && "opacity-50"} transition-all animated fadeIn`}>
            <div className="container -translate-x-1/2 fixed left-1/2 px-4 top-4 transform z-50">
                {/* Navbar */}
                <nav
                    className={`transition-all duration-300 ease-in-out ${scrolled ? "bg-white/90 backdrop-blur-2xl shadow-[0_5px_35px_rgba(0,0,0,0.1)] py-3 px-3 outline-gray-100 outline" : "bg-transparent py-0"
                        } border-gray-200 rounded flex justify-between items-center gap-2`}
                >
                    <div className="flex gap-6 items-center">
                        <div className="flex gap-1 items-center">
                            <img src="/images/logos/logo.png" alt="logo" width={30} />
                            <Link to="/" className="text-gray-900 font-bold">
                                <span>OwenaHub</span>
                            </Link>
                        </div>

                    </div>
                    <div className="hidden text-xs md:flex gap-4 items-center text-gray-800 mt-1">
                        {[
                            { name: "Courses", path: "/courses" },
                            { name: "Mentors", path: "/mentors" },
                            { name: "Blog", path: "/blog" },
                        ].map((link) => (
                            <NavLink
                                key={link.name}
                                className={({ isActive }) => (isActive ? "font-bold" : "text-gray-500")}
                                to={link.path}
                            >
                                {link.name}
                            </NavLink>
                        ))}
                    </div>
                    <div className="hidden md:block">
                        <Suspense fallback={<div className="h-7 w-28 bg-gray-100 animate-pulse" />}>
                            <Await resolve={session}>
                                <div className="flex gap-2 items-center">
                                    {session
                                        ? (
                                            <div className="flex gap-2 items-center">
                                                <Link to="/dashboard">
                                                    <span className="text-sm font-light text-gray-800">{user.name}</span>
                                                </Link>
                                                <CustomAvatar name={user.name || ""} styles="h-10 w-10" />
                                            </div>
                                        )
                                        : (<>
                                            <Link to="/login" className="bg-white border rounded text-secondary-foreground text-xs hover:shadow-lg px-5 py-1.5 uppercase">
                                                Log in
                                            </Link>
                                        </>)
                                    }
                                </div>
                            </Await>
                        </Suspense>
                    </div>
                    <button aria-label="Menu" className="block md:hidden" type="button" onClick={() => setMenu(!menu)}>
                        {!menu
                            ? <Menu />
                            : <X />
                        }
                    </button>
                </nav>
                {menu && (
                    <div className="bg-white animated fadeIn rounded-lg shadow-2xl block md:hidden mt-4 mx-auto px-4 py-4 z-50">
                        <div>
                            <div className="mb-3">
                                {[
                                    { name: "Courses", path: "/courses" },
                                    { name: "Mentors", path: "/mentors" },
                                    { name: "Blog", path: "/blog" },
                                ].map((link) => (
                                    <div key={link.name} className="border-b py-4">
                                        <NavLink
                                            onClick={() => setMenu(!menu)}
                                            to={link.path}
                                            className={({ isActive }) => isActive ? "text-primary font-bold" : "text-gray-500"}
                                        >
                                            {link.name}
                                        </NavLink>
                                    </div>
                                ))}
                                <div className="py-4">
                                    <a href="tel:+2348026658956" className="flex text-foreground text-sm font-light gap-2 items-center">
                                        <span>Contact support</span> <ChevronRight size={12} />
                                    </a>
                                </div>
                            </div>
                            <div className="flex flex-col gap-4">
                                <Suspense fallback={<div className="h-10 w-full rounded bg-gray-100 animate-pulse" />}>
                                    <Await resolve={session}>
                                        {(session: boolean) =>
                                            session ? (
                                                <Link
                                                    onClick={() => setMenu(!menu)}
                                                    to="/dashboard"
                                                    className="bg-secondary rounded-[6px] text-secondary-foreground text-xs font-medium hover:shadow-lg py-3 text-center uppercase"
                                                >
                                                    Dashboard
                                                </Link>
                                            ) : (
                                                <>
                                                    <Link
                                                        onClick={() => setMenu(!menu)}
                                                        to="/login"
                                                        className="bg-white border border-secondary-foreground rounded-[6px] text-center text-secondary-foreground text-sm w-full block font-bold hover:shadow-lg py-2 uppercase"
                                                    >
                                                        Log in
                                                    </Link>
                                                    <Link
                                                        onClick={() => setMenu(!menu)}
                                                        to="/register"
                                                        className="bg-primary rounded-[6px] text-white text-center text-sm w-full block font-bold hover:bg-gray-800 py-2 uppercase"
                                                    >
                                                        Sign up
                                                    </Link>
                                                </>
                                            )
                                        }
                                    </Await>
                                </Suspense>
                            </div>
                        </div>
                    </div>
                )}
            </div >

            <div className={`${busy && "opacity-50"} transition-all`}>
                <Outlet />
            </div>

            <footer className="bg-gray-50 text-gray-700 py-8" id="footer">
                <div className="container text-sm">
                    <div className="justify-between block items-center md:flex">
                        <div>
                            <div className="flex items-center space-x-2">
                                <img src="/images/logos/logo.png" alt="..." className="h-6 w-6 relative top-[2px]" />
                                <div className="font-bold relative top-[3px]">OwenaHub</div>
                            </div>
                        </div>
                        <p className="md:mt-0 mt-6">
                            <span className="font-semibold">The Learner's Hub</span> <br />
                            <span className="text-xs"> Fostering global connections, leveraging experts <br /> to empower learners through mentorship.</span>
                        </p>
                    </div>
                    <hr className="border-gray-200 my-8" />
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-4 mt-3">
                        <div>
                            <h3 className="text-sm font-semibold pb-2">SOCIALS</h3>
                            <a
                                href="https://instagram.com/owenahub?utm_source=qr&igshid=MzNlNGNkZWQ4Mg%3D%3D"
                                target="_blank"
                                className="flex text-xs gap-2 hover:underline items-center pb-2"
                                rel="noopener"
                            >
                                <Instagram size={14} className="inline-block" /> <span>Instagram</span>
                            </a>
                            <a
                                href="https://x.com/owenahub?t=i4-Iz4K9RaKJ4vWP1QuLlA&s=08"
                                target="_blank"
                                className="flex text-xs gap-2 hover:underline items-center pb-2"
                                rel="noopener"
                            >
                                <Twitter size={14} className="inline-block" /> <span>Twitter</span>
                            </a>
                            <a
                                href="https://www.facebook.com/owenahub?mibextid=ZbWKwL"
                                target="_blank"
                                className="flex text-xs gap-2 hover:underline items-center pb-2"
                                rel="noopener"
                            >
                                <Facebook size={14} className="inline-block" /> <span>Facebook</span>
                            </a>
                        </div>
                        <div>
                            <h3 className="text-sm font-semibold pb-2">CONTACT</h3>
                            <a href="mailto:admin@owenahub.com"
                                className="text-xs block hover:underline pb-2">admin@owenahub.com</a>
                            <a href="mailto:support@owenahub.com"
                                className="text-xs block hover:underline pb-2">support@owenahub.com</a>
                        </div>
                        <div>
                            <h3 className="text-sm font-semibold pb-2">QUICK LINKS</h3>
                            <Link to="/blog" className="text-xs block hover:underline pb-2">
                                OwenaHub Blog
                            </Link>
                            <Link to="/courses"
                                className="text-xs block hover:underline pb-2">
                                Courses: <span className="text-theme font-semibold">Mentorship tracks</span>
                            </Link>
                            <Link to="classes"
                                className="text-xs block hover:underline pb-2">
                                Private Sessions
                            </Link>
                            <Link to="#"
                                className="text-xs block hover:underline pb-2">
                                Profile builder <span className="rounded px-2 py-1 ms-1 bg-primary-theme text-white text-[10px] font-bold">Coming soon!</span>
                            </Link>
                        </div>
                        <div>
                            <h3 className="text-sm font-semibold pb-2">COMMUNITIES</h3>
                            <a
                                href="https://linkedin.com/company/owenahub" target="_blank"
                                className="text-xs block hover:underline pb-2"
                                rel="noopener"
                            >
                                LinkedIn Community
                            </a>
                            <a
                                href="https://www.facebook.com/groups/896520008575738/?ref=share"
                                target="_blank"
                                className="text-xs block hover:underline pb-2"
                                rel="noopener"
                            >
                                Facebook Community
                            </a>
                            <a
                                href="https://chat.whatsapp.com/CclgnpXKrZrEp9Bc4O98cd"
                                target="_blank"
                                className="text-xs block hover:underline pb-2"
                                rel="noopener"
                            >
                                WhatsApp Community
                            </a>
                        </div>
                    </div>
                    <div className="justify-between text-gray-500 text-xs block items-center md:flex-row mt-6">
                        <p className="m-0">&copy; {new Date().getFullYear()}, OwenaHub. All Rights Reserved.</p>
                        <p className="m-0">
                            <Link to="/privacy-policy" className="hover:underline">Privacy Policy</Link> &middot; {" "}
                            <Link to="/terms-of-service" className="hover:underline">Terms of Service</Link>
                        </p>
                    </div>
                </div>
            </footer>
        </section >
    )
}