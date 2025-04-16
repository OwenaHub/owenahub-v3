import { NavLink } from "react-router";
import { Square } from "lucide-react";
import React, { type JSX } from "react";

export default function NavButton({ href, label, icon }: {
    href: string, label: string, icon?: JSX.Element
}) {
    return (
        <NavLink
            to={href}
            className={({ isActive, isPending }) =>
                isActive
                    ? "block mb-2 text-[#315E8B] bg-gray-100 rounded"
                    : isPending
                        ? "block mb-2 rounded  hover:bg-gray-50 text-[#67737E]"
                        : "block mb-2 rounded hover:bg-gray-50 text-[#67737E]"
            }
            viewTransition
        >
            {({ isActive }) => (
                <div className="flex items-center gap-0.5">
                    <span className={`inline-block p-2 ${isActive ? "text-[#315E8B] rounded" : ""}`}>
                        {icon ? (React.cloneElement(icon, { fill: isActive ? 'none' : 'none' }))
                            : (<span>
                                <Square size={24} />
                            </span>)
                        }
                    </span>
                    <span className={`hidden md:inline-block ${isActive ? "font-bold" : "font-medium"}`}>
                        {label}
                    </span>
                </div>
            )}
        </NavLink>

    );
}
