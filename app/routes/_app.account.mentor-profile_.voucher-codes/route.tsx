import { Suspense } from 'react'
import { Await } from 'react-router'
import TableCard from '~/components/cards/table-card'
import NavigateBack from '~/components/navigation/navigate-back'
import CardSkeleton from '~/components/skeletons/card-skeleton'
import { getVoucherCodes } from './get-codes'
import { VoucherCodeTable } from './voucher-code-table'
import type { Route } from '../_app.account.mentor-profile_.voucher-codes/+types/route'

export async function clientLoader({ }: Route.ClientLoaderArgs) {
    try {
        const codes = await getVoucherCodes()
        return { codes };
    } catch (error) {
        return {};
    }
}

export default function MentorVoucherCodes({ loaderData }: Route.ComponentProps) {
    const { codes } = loaderData;
    return (
        <section>
            <NavigateBack to="mentor profile" />
            <div className="pb-4">
                <TableCard header="Voucher codes" cta="New vode" ctaLink="create">
                    <Suspense fallback={<CardSkeleton />}>
                        <Await resolve={codes}>
                            {(codes) => <VoucherCodeTable voucherCodes={codes} />}
                        </Await>
                    </Suspense>
                </TableCard>
            </div>
        </section>
    )
}
