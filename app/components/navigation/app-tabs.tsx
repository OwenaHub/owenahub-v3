import { UserRound, Wallet, GraduationCap, Shapes, LayoutGrid } from 'lucide-react';

const APP_TABS = [
    {
        href: `/dashboard`,
        title: 'Dashboard',
        icon: <LayoutGrid size={22} strokeWidth={1.7} />,
    },
    {
        href: `/classes`,
        title: 'Classes',
        icon: <Shapes size={22} strokeWidth={1.7} />,
    },
    {
        href: `/courses`,
        title: 'Courses',
        icon: <GraduationCap size={22} strokeWidth={1.7} />,
    },
    {
        href: `/payments`,
        title: 'Payments',
        icon: <Wallet size={22} strokeWidth={1.7} />,
    },
    {
        href: `/account`,
        title: 'Account',
        icon: <UserRound size={22} strokeWidth={1.7} />,
    },
];

export default APP_TABS;
