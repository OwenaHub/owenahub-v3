import client from "~/lib/interceptor";
import type { Route } from "./+types/route";
import { toast } from "sonner";

export async function clientAction({ params }: Route.ClientActionArgs) {
    const promise = new Promise(async (resolve, reject) => {
        try {
            await client.delete(`/api/mentor/courses/${params.ulid}/modules/${params.id}`);
            resolve('Module deleted!');
        } catch (error) {
            reject(error);
        }
    });

    toast.promise(promise, {
        loading: 'Deleting module...',
        success: (message) => message as string,
        error: 'Error deleting module',
    });

    return null;
}
