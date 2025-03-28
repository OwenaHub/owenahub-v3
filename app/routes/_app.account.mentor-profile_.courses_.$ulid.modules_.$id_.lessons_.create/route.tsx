import { Form, redirect } from "react-router";
import TableCard from "~/components/cards/table-card";
import type { Route } from "../_app.account.mentor-profile_.courses_.$ulid.modules_.create/+types/route";
import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";
import InputError from "~/components/forms/input-error";
import { createLesson } from "./create-lesson";
import { toast } from "sonner";
import { Button } from "~/components/ui/button";
import { useState } from "react";
import { TextEditor } from "~/components/custom/quill.client";

export async function clientAction({ params, request }: Route.ClientActionArgs) {
  const formData = await request.formData();
  const credentials = Object.fromEntries(formData);
  const { ulid } = params;
  credentials.course_id = ulid;

  try {
    const { data } = await createLesson(credentials);
    console.log(data);

    toast.success("Course created ✅", {
      description: "You have successfully created a lesson",
    });
    return redirect(`/account/mentor-profile/courses/${ulid}/modules/${data.id}/lessons`);
  } catch ({ response }: any) {
    toast.error("Failed to create module", {
      description: response?.data?.error || "An error occurred",
    });
    const error: any = response?.data?.errors;
    return error;
  }
}

export default function CreateLesson({ actionData }: Route.ComponentProps) {
  let errors = actionData;
  const [content, setContent] = useState("");


  return (
    <div className="pb-4 mt-10">
      <div className="pb-4 mt-10">
        <TableCard header="Create a lesson">
          <section>
            <Form method="POST">
              <div className="mb-5">
                <Label htmlFor="title" className="mb-1">Lesson title</Label>
                <Input id="title" name="title" className="bg-white rounded" required />
                <InputError for="title" error={errors} />
              </div>

              <div className="mb-5">
                <Label htmlFor="position" className="mb-1">Position</Label>
                <Input id="position" name="position" type="number" className="bg-white rounded" required />
                <InputError for="position" error={errors} />
              </div>

              <div className="mb-5">
                <Label htmlFor="video_url" className="mb-1">Video URL</Label>
                <Input id="video_url" name="video_url" type="url" className="bg-white rounded" required />
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
                    modulesConfig={[
                      "font-selection",
                      "headers",
                      "formatting",
                      "text-alignment",
                      "blockquote-code",
                      "lists-indentation",
                      "color-picker",
                      "remove-formatting",
                    ]}
                  />
                </div>
                <InputError for="content" error={errors} />
              </div>

              <div className="mt-5">
                <Button type="submit" className="bg-secondary-foreground uppercase text-sm text-white w-max py-2 px-10 rounded cursor-pointer hover:bg-primary-foreground">
                  Create lesson
                </Button>
              </div>
            </Form>
          </section>
        </TableCard>
      </div>
    </div>
  )
}

