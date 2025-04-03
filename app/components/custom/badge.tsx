import React, { type JSX } from 'react'

export default function Badge({ icon, title, description }: { icon?: JSX.Element, title: string, description: string }) {
    return (
        <div className="rounded-full text-nowrap px-6 py-2 flex gap-2 items-center bg-primary-bg border border-primary-theme text-amber-900 ]cursor-pointer hover:shadow-lg transition">
            {icon && (React.cloneElement(icon))}
            <div>
                <div className="text-sm font-bold">{title}</div>
                <div className="text-xs">{description}</div>
            </div>
        </div>
    )
}
