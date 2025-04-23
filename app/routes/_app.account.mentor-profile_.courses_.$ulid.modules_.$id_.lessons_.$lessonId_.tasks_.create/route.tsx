import { Form, redirect } from "react-router";
import TableCard from "~/components/cards/table-card";
import InputError from "~/components/forms/input-error";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import type { Route } from "../_app.account.mentor-profile_.courses_.$ulid.modules_.$id_.lessons_.$lessonId_.tasks_.create/+types/route";
import { createTask } from "./create-task";
import { toast } from "sonner";
import { TextEditor } from "~/components/custom/quill.client";
import { useState } from "react";

export async function clientAction({ params, request }: Route.ClientActionArgs) {
    const formData = await request.formData();
    const credentials = Object.fromEntries(formData);
    const { ulid, id } = params;

    try {
        const { data } = await createTask(credentials);
        console.log(data);

        toast.success("Task created");
        return redirect(`/account/mentor-profile/courses/${ulid}/modules/${id}/lessons`);
    } catch ({ response }: any) {

        if (response?.status !== 422)
            toast.error("Failed to create module", {
                description: response?.data?.error || "An error occurred",
            });

        const error: any = response?.data?.errors;
        return error;
    }
}

export default function CreateTask({ actionData, params }: Route.ComponentProps) {
    let errors = actionData;
    const [instruction, setInstruction] = useState("");

    return (
        <div className="pb-4 mt-10">
            <div className="pb-4 mt-10">
                <TableCard header="New task">
                    <section>
                        <Form method="POST" encType="multipart/form-data">
                            <input type="hidden" name="lessonId" value={params.lessonId} />
                            <div className="mb-5">
                                <Label htmlFor="name" className="mb-1">Name</Label>
                                <Input
                                    id="name"
                                    name="name"
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
                                    Create Task
                                </Button>
                            </div>
                        </Form>
                    </section>
                </TableCard>
            </div>
        </div>
    )
}
