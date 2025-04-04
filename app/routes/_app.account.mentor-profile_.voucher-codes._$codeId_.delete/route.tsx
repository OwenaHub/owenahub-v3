import client from "~/lib/interceptor";
import { toast } from "sonner";
import type { Route } from "../_app.account.mentor-profile_.voucher-codes._$codeId_.delete/+types/route";

export async function clientAction({ params }: Route.ClientActionArgs) {
    const promise = new Promise(async (resolve, reject) => {
        try {
            await client.delete(`/api/mentor/voucher-codes/${params.codeId}`);
            resolve('Voucher code deleted');
        } catch (error) {
            reject(error);
        }
    });

    toast.promise(promise, {
        loading: 'Deleting code...',
        success: (message) => message as string,
        error: 'Error deleting code',
    });

    return null;
}
