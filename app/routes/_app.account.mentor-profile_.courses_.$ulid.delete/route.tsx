import client from "~/lib/interceptor";
import type { Route } from "../_app.account.mentor-profile_.courses_.$ulid.delete/+types/route";
import { toast } from "sonner";

export async function clientAction({ params }: Route.ClientActionArgs) {
    const promise = new Promise(async (resolve, reject) => {
        try {
            await client.delete(`/api/mentor/courses/${params.ulid}`);
            resolve('Course deleted!');
        } catch (error) {
            reject(error);
        }
    });

    toast.promise(promise, {
        loading: 'Deleting course...',
        success: (message) => message as string,
        error: 'Error deleting course',
    });

    return null;
}
