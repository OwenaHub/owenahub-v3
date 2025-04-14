import { Form, redirect } from "react-router";
import TableCard from "~/components/cards/table-card";
import type { Route } from "./+types/route";
import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";
import InputError from "~/components/forms/input-error";
import { getLesson, updateLesson } from "./update-lesson";
import { toast } from "sonner";
import { Button } from "~/components/ui/button";
import { useState } from "react";
import { TextEditor } from "~/components/custom/quill.client";

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
    try {
        if (!params.ulid || !params.id || !params.lessonId) throw new Error("Invalid request");
        const lesson = await getLesson(params.ulid, params.id, params.lessonId);
        return lesson;
    } catch (error) {
        console.log(error);
        toast.warning('Failed to fetch resource');
        return redirect(`account/mentor-profile/courses/${params.ulid}/modules/${params.id}/lessons`)
    }
}

export async function clientAction({ params, request }: Route.ClientActionArgs) {
    const formData = await request.formData();
    const credentials = Object.fromEntries(formData);

    const { ulid, id, lessonId } = params;

    credentials.courseId = ulid;
    credentials.moduleId = id;
    credentials.lessonId = lessonId;

    try {
        await updateLesson(credentials);
        toast.success("Lesson edited");
        return redirect(`/account/mentor-profile/courses/${ulid}/modules/${id}/lessons`);
    } catch ({ response }: any) {
        toast.error("Failed to create module", {
            description: response?.data?.error || "An error occurred",
        });
        const error: any = response?.data?.errors;
        return error;
    }
}

export default function EditLesson({ loaderData, actionData }: Route.ComponentProps) {
    const errors = actionData;
    const lesson = loaderData;

    const [content, setContent] = useState(lesson.content);

    return (
        <div className="pb-4 mt-10">
            <div className="pb-4 mt-10">
                <TableCard header="Create a lesson">
                    <section>
                        <Form method="POST">
                            <div className="mb-5">
                                <Label htmlFor="title" className="mb-1">Lesson title</Label>
                                <Input defaultValue={lesson.title} id="title" name="title" className="bg-white rounded" required />
                                <InputError for="title" error={errors} />
                            </div>

                            <div className="mb-5">
                                <Label htmlFor="position" className="mb-1">Position</Label>
                                <Input defaultValue={lesson.position} id="position" name="position" type="number" className="bg-white rounded" />
                                <InputError for="position" error={errors} />
                            </div>

                            <div className="mb-5">
                                <Label htmlFor="video_url" className="mb-1">Video URL</Label>
                                <Input defaultValue={lesson.videoUrl} id="video_url" name="video_url" type="url" className="bg-white rounded" />
                                <InputError for="video_url" error={errors} />
                            </div>

                            <div className="mb-5">
                                <Label htmlFor="content" className="mb-1">Content</Label>
                                <div className="border rounded-lg bg-white">
                                    <TextEditor
                                        theme="snow"
                                        placeholder="Write your lesson content"
                                        onChange={setContent}
                                        value={content}
                                    />
                                </div>
                                <input type="hidden" name="content" value={content} />
                                <InputError for="content" error={errors} />
                            </div>

                            <div className="mt-5">
                                <Button type="submit" className="bg-secondary-foreground uppercase w-full text-sm text-white py-2 px-10 rounded cursor-pointer hover:opacity-60">
                                    Update lesson
                                </Button>
                            </div>
                        </Form>
                    </section>
                </TableCard>
            </div>
        </div>
    )
}

