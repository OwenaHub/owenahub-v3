import AccountMenu from './account-menu'
import { useOutletContext } from 'react-router';

export default function Account() {
    const user: User = useOutletContext();

    return (
        <div className='mb-20'>
            <AccountMenu user={user} />
        </div>
    )
}
