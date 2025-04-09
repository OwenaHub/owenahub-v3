import { Form, redirect } from "react-router";
import TableCard from "~/components/cards/table-card";
import type { Route } from "./+types/route";
import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";
import InputError from "~/components/forms/input-error";
import { getModule, updateModule } from "./update-module";
import { toast } from "sonner";
import { Textarea } from "~/components/ui/textarea";
import { Button } from "~/components/ui/button";

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
    try {
        if (!params.ulid || !params.id) throw new Error("Invalid request");
        const module = await getModule(params.ulid, params.id);
        return module;
    } catch (error) {
        console.log(error);
        toast.warning('Failed to fetch resource');
        return redirect(`account/mentor-profile/courses/${params.ulid}`)
    }
}

export async function clientAction({ params, request }: Route.ClientActionArgs) {
    const formData = await request.formData();
    const credentials = Object.fromEntries(formData);

    const { ulid, id } = params;

    credentials.courseId = ulid;
    credentials.moduleId = id;

    try {
        const { data } = await updateModule(credentials);
        console.log(data);

        toast.success("Module updated 🔥");
        return redirect(`/account/mentor-profile/courses/${ulid}`);
    } catch ({ response }: any) {
        toast.error("Failed to create module", {
            description: response?.data?.error || "An error occurred",
        });
        const error: any = response?.data?.errors;
        return error;
    }
}

export default function route({ loaderData, actionData }: Route.ComponentProps) {
    const errors = actionData;
    const module = loaderData;

    return (
        <div className="pb-4 mt-10">
            <div className="pb-4 mt-10">
                <TableCard header="New module">
                    <section>
                        <Form method="POST">
                            <div className="mb-5">
                                <Label htmlFor="title" className="mb-1">Module title</Label>
                                <Input defaultValue={module.title} id="title" name="title" className="bg-white rounded" required />
                                <InputError for="title" error={errors} />
                            </div>

                            <div className="mb-5">
                                <Label htmlFor="position" className="mb-1">Position</Label>
                                <Input defaultValue={module.position} id="position" name="position" type="number" className="bg-white rounded" />
                                <InputError for="position" error={errors} />
                            </div>

                            <div className="mb-5">
                                <Label htmlFor="description" className="mb-1">Overview/description</Label>
                                <Textarea defaultValue={module.description} id="description" name="description" className="bg-white rounded" required />
                                <InputError for="description" error={errors} />
                            </div>
                            <div className="mt-5">
                                <Button type="submit" className="bg-secondary-foreground uppercase text-sm text-white w-full py-2 rounded cursor-pointer hover:opacity-60">
                                    Update module
                                </Button>
                            </div>
                        </Form>
                    </section>
                </TableCard>
            </div>
        </div>
    )
}


