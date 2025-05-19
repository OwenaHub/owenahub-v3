import { Suspense } from 'react'
import { Await } from 'react-router'
import TableCard from '~/components/cards/table-card'
import NavigateBack from '~/components/navigation/navigate-back'
import CardSkeleton from '~/components/skeletons/card-skeleton'
import { UsersTable } from './users-table'
import type { Route } from '../_app.account.admin_.users/+types/route'
import { getUsers } from './get-users'

export async function clientLoader({ }: Route.ClientLoaderArgs) {
    try {
        const users = await getUsers()
        return { users };
    } catch (error) {
        return {};
    }
}

export default function AccountUser({ loaderData }: Route.ComponentProps) {
    const { users } = loaderData;

    return (
        <section>
            <NavigateBack to="Administrator" />
            <div className="pb-4">
                <TableCard header="Users">
                    <Suspense fallback={<CardSkeleton />}>
                        <Await resolve={users}>
                            {(users) => <UsersTable users={users} />}
                        </Await>
                    </Suspense>
                </TableCard>
            </div>
        </section>
    )
}
