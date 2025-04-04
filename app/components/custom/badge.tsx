import React, { type JSX } from 'react'

export default function Badge({ icon, title, description }: { icon?: JSX.Element, title: string, description: string }) {
    return (
        <div className="rounded-full text-nowrap px-6 py-2 flex gap-2 items-center bg-muted text-primary cursor-pointer hover:bg-muted-foreground transition">
            {icon && (React.cloneElement(icon))}
            <div>
                <div className="text-sm font-semibold">{title}</div>
                <div className="text-xs">{description}</div>
            </div>
        </div>
    )
}
