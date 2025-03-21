import { ChevronRight } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router'

export default function TableCard({
    header, cta, ctaLink, children }: {
        header: string, cta: string, ctaLink: string, children: React.ReactNode
    }) {
    return (
        <section className='rounded-lg border'>
            <div className="flex justify-between items-center py-3.5 px-4 border-b">
                <h5 className='text-base text-primary-foreground font-bold'>{header}</h5>
                <Link to={ctaLink} className='flex items-center gap-1 text-base text-[#777777] font-bold hover:underline underline-offset-1'>
                    {cta} <ChevronRight size={16} strokeWidth={3}/>
                </Link>
            </div>

            <div className='p-3'>
                {children}
            </div>
        </section>
    )
}
