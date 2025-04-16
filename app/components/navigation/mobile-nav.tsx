import React from 'react';
import { NavLink, useLocation } from 'react-router';
import APP_TABS from './app-tabs';

export default function MobileNav() {
    const location = useLocation();
    const notNeeded = /^\/inbox\/[^/]+\/view$/.test(location.pathname);

    return (
        <>
            {!notNeeded && (
                <nav className='bg-white p-2 fixed bottom-0 left-0 right-0 !shadow-[0px_0px_25px_#80808020]'>
                    <div className='flex justify-around'>
                        {APP_TABS.map((item) => (
                            <NavLink key={item.href} to={item.href}
                                className={({ isActive, isPending }) =>
                                    isActive ? "flex-1 block rounded py-2 text-[#315E8B] bg-gray-100"
                                        : isPending
                                            ? "flex-1 block rounded-lg py-2 opacity-50"
                                            : "flex-1 block rounded-lg py-2"
                                }
                                viewTransition
                            >
                                {({ isActive }) => (
                                    <div className='flex flex-col items-center gap-1'>
                                        {React.cloneElement(item.icon, {
                                            size: 28,
                                            fill: isActive ? 'none' : 'none', // Active icons filled, inactive unchanged
                                        })}
                                        <span className='text-xs'>
                                            {item.title}
                                        </span>
                                    </div>
                                )}
                            </NavLink>
                        ))}
                    </div>
                </nav>
            )}
        </>
    )
}
