import { toast } from "sonner";
import client from "~/lib/interceptor";
import { redirect } from "react-router";
import type { Route } from "../_app.courses.enroll.$ulid/+types/route";

export async function clientAction({ params, request }: Route.ClientActionArgs) {
    const formData = await request.formData();
    const credentials = Object.fromEntries(formData);

    try {
        await client.post(`/api/user/enrollment/courses/${params.ulid}`, {
            code: credentials.code,
        });

        toast.success("Congratulations!", {
            description: "You have enrolled in a new course"
        })
        return redirect(`/my-courses/${params.ulid}`);
    } catch ({ response: { data } }: any) {
        toast.error("Something went wrong", {
            description: `${data.error}`
        });
        return redirect(`/courses/${params.ulid}`)
    }
}