import AccountMenu from './account-menu'
import { useOutletContext } from 'react-router';

export default function route() {
    const user: User = useOutletContext();

    return (
        <div>
            <AccountMenu user={user} />
        </div>
    )
}
