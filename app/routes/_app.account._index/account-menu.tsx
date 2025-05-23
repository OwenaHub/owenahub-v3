import { CircleUser, ShieldUser, SquareUser, UserRoundCog, Wallet } from 'lucide-react'
import { Link } from 'react-router'
import { IsAdmin, IsMentor } from '~/components/permissions/roles'

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
                <Icon size={40} strokeWidth={1} className="" />
            </div>
            <div>
                <h5 className="font-semibold text-sm mb-1">{title}</h5>
                <p className="text-gray-500 text-xs font-light">{description}</p>
                <Link to={link} aria-hidden="true" className="absolute inset-0" />
            </div>
        </div>
    )
}

export default function AccountMenu({ user }: { user: User }) {
    const cards = [
        {
            icon: UserRoundCog,
            title: 'Account settings',
            description: 'Find settings related to your account',
            link: 'settings',
        },
        {
            icon: Wallet,
            title: 'Plans & billings',
            description: 'Manage your subscriptions and payments here',
            link: 'payments',
        },
        {
            icon: SquareUser,
            title: 'Your portfolio',
            description: "OwenaHub's intuitive portfolio builder",
            link: 'portfolio',
        },
    ]

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-10">
            {cards.map((card, index) => (
                <Card key={index} {...card} />
            ))}

            <IsMentor user={user}>
                <Card
                    icon={CircleUser}
                    title="Mentor profile"
                    description="Manage your mentor profile and mentor actions"
                    link="mentor-profile"
                />
            </IsMentor>

            <IsAdmin user={user}>
                <Card
                    icon={ShieldUser}
                    title="Administrator"
                    description="Manage OwenaHub"
                    link="admin"
                />
            </IsAdmin>
        </div>
    )
}
