export function IsAdmin({ children, user }: { children: React.ReactNode; user?: User }) {
    if (!user || user.account_type !== 'admin') {
        return null;
    }
    return <>{children}</>;
}
