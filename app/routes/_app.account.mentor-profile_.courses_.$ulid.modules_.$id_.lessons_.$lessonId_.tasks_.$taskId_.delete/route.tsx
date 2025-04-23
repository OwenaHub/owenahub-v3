import client from "~/lib/interceptor";
import type { Route } from "../_app.account.mentor-profile_.courses_.$ulid.modules_.$id_.lessons_.$lessonId_.tasks_.$taskId_.delete/+types/route";
import { toast } from "sonner";

export async function clientAction({ params }: Route.ClientActionArgs) {
    const promise = new Promise(async (resolve, reject) => {
        try {
            await client.delete(`/api/mentor/tasks/${params.taskId}`);
            resolve('Task deleted');
        } catch (error) {
            reject(error);
        }
    });

    toast.promise(promise, {
        loading: 'Deleting task...',
        success: (message) => message as string,
        error: (error) => error.response.data.message || 'Error deleting task',
    });

    return null;
}