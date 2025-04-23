import { Form, redirect } from "react-router";
import TableCard from "~/components/cards/table-card";
import InputError from "~/components/forms/input-error";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { getTask, updateTask } from "./edit-task";
import { toast } from "sonner";
import { TextEditor } from "~/components/custom/quill.client";
import { useState } from "react";
import type { Route } from "../_app.account.mentor-profile_.courses_.$ulid.modules_.$id_.lessons_.$lessonId_.tasks_.$taskId_.edit/+types/route";

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
    try {
        if (!params.taskId) throw new Error("Invalid request");
        const task = await getTask(params.taskId);
        return task;
    } catch (error) {
        console.log(error);
        toast.warning('Failed to fetch resource');
        return redirect(`/account/mentor-profile/courses/${params.ulid}/modules/${params.id}/lessons`)
    }
}

export async function clientAction({ params, request }: Route.ClientActionArgs) {
    const formData = await request.formData();
    const credentials = Object.fromEntries(formData);
    credentials.taskId = params.taskId;
    
    try {
        await updateTask(credentials);

        toast.success("Task updated");
        return redirect(`/account/mentor-profile/courses/${params.ulid}/modules/${params.id}/lessons`);
    } catch ({ response }: any) {

        if (response?.status !== 422)
            toast.error("Failed to update task", {
                description: response?.data?.error || "An error occurred",
            });

        const error: any = response?.data?.errors;
        return error;
    }
}

export default function EditTask({ loaderData, actionData, params }: Route.ComponentProps) {
    const task = loaderData;
    const errors = actionData;

    const [instruction, setInstruction] = useState(task.instruction || "");

    return (
        <div className="pb-4 mt-10">
            <div className="pb-4 mt-10">
                <TableCard header="Edit task">
                    <section>
                        <Form method="POST" encType="multipart/form-data">
                            <input type="hidden" name="lessonId" value={params.lessonId} />
                            <div className="mb-5">
                                <Label htmlFor="name" className="mb-1">Name</Label>
                                <Input
                                    id="name"
                                    name="name"
                                    type="text"
                                    defaultValue={task.name}
                                    className="bg-white rounded"
                                    placeholder="Write Fen's Algorithm"
                                    required
                                />
                                <InputError for="name" error={errors} />
                            </div>

                            <div className="mb-5">
                                <Label htmlFor="image" className="mb-1">Image</Label>
                                <Input id="image_url" name="image_url" type="file" className="bg-white rounded" />
                                <InputError for="image_url" error={errors} />
                            </div>

                            <div className="mb-5">
                                <Label htmlFor="instruction" className="mb-1">Instruction</Label>
                                <TextEditor
                                    theme="snow"
                                    placeholder="Instructions to get done..."
                                    onChange={setInstruction}
                                    value={instruction}
                                    modulesConfig={[
                                        "formatting",
                                        "lists-indentation",
                                        "remove-formatting",
                                    ]}
                                />
                                <input type="hidden" name="instruction" value={instruction} />
                                <InputError for="instruction" error={errors} />
                            </div>

                            <div className="mt-5">
                                <Button type="submit" className="bg-secondary-foreground uppercase text-sm text-white w-full py-2 rounded cursor-pointer hover:opacity-60">
                                    Update Task
                                </Button>
                            </div>
                        </Form>
                    </section>
                </TableCard>
            </div>
        </div>
    )
}
