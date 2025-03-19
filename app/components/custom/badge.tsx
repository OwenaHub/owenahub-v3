import React, { type JSX } from 'react'

export default function Badge({ icon, title }: { icon?: JSX.Element, title: string }) {
    return (
        <div className="rounded-full px-2 py-1 flex gap-2 items-center bg-[#3C5D87] text-white cursor-pointer hover:shadow-lg transition">
            {icon && (React.cloneElement(icon))}
            <span className="text-xs md:text-sm">{title}</span>
        </div>
    )
}
