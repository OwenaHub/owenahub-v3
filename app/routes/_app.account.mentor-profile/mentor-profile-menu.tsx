import { Book, LibraryBig, ScrollText } from 'lucide-react'
import { Link } from 'react-router'

type CardProps = {
    icon: React.ElementType
    title: string
    description: string
    link: string
}

function Card({ icon: Icon, title, description, link }: CardProps) {
    return (
        <div className="flex border relative border-b-2 p-3 rounded-lg gap-3 items-center hover:bg-gray-50 transition">
            <div>
                <Icon size={40} strokeWidth={1} />
            </div>
            <div>
                <h5 className="font-semibold text-sm mb-1">{title}</h5>
                <p className="text-gray-500 text-xs font-light">{description}</p>
                <Link to={link} aria-hidden="true" className="absolute inset-0" />
            </div>
        </div>
    )
}

export default function Menu() {
    const cards = [
        {
            icon: Book,
            title: 'Manage courses',
            description: 'View and manage your courses',
            link: 'courses',
        },
        {
            icon: LibraryBig,
            title: 'Task submision',
            description: 'See submissions on your tasks',
            link: 'task-submissions',
        },
        {
            icon: ScrollText,
            title: 'Voucher codes',
            description: 'Create and manage voucher codes',
            link: 'voucher-codes',
        },
    ]

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            {cards.map((card, index) => (
                <Card key={index} {...card} />
            ))}
        </div>
    )
}
