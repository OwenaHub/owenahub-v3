import { toast } from "sonner";
import client from "~/lib/interceptor";
import type { Route } from "./+types/route";
import { redirect } from "react-router";

export async function clientAction({ params, request }: Route.ClientActionArgs) {
    const formData = await request.formData();
    const credentials = Object.fromEntries(formData);

    try {
        await client.post(`/api/enrollment/courses/${params.ulid}`, {
            code: credentials.code,
        });

        toast("Congratulations!", {
            description: "You have enrolled in a new course"
        })
        return redirect(`/my-courses/${params.id}`);
    } catch ({ response: { data } }: any) {
        toast("Something went wrong");
        return redirect(`/courses/${params.id}`)
    }
}