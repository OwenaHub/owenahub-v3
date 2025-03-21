export function IsAdmin({ children, user }: { children: React.ReactNode; user?: User }) {
    if (!user || user.accountType !== 'admin') {
        return null;
    }
    return <>{children}</>;
}
