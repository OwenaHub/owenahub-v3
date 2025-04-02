import { Form, redirect } from "react-router";
import TableCard from "~/components/cards/table-card";
import type { Route } from "./+types/route";
import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";
import InputError from "~/components/forms/input-error";
import { createCourseModule } from "./create-course-module";
import { toast } from "sonner";
import { ArrowRight } from "lucide-react";
import { Textarea } from "~/components/ui/textarea";
import { Button } from "~/components/ui/button";

export async function clientAction({ params, request }: Route.ClientActionArgs) {
  const formData = await request.formData();
  const credentials = Object.fromEntries(formData);
  const { ulid } = params;
  credentials.course_id = ulid;

  try {
    const { data } = await createCourseModule(credentials);
    console.log(data);

    toast.success("Module created 🔥", {
      description: "Proceed to adding courses",
      action: {
        label: (<ArrowRight size={18} />),
        onClick: () => redirect(`modules/`),
      },
    });
    return redirect(`/account/mentor-profile/courses/${ulid}`);
  } catch ({ response }: any) {
    toast.error("Failed to create module", {
      description: response?.data?.error || "An error occurred",
    });
    const error: any = response?.data?.errors;
    return error;
  }
}

export default function route({ actionData }: Route.ComponentProps) {
  let errors = actionData;

  return (
    <div className="pb-4 mt-10">
      <div className="pb-4 mt-10">
        <TableCard header="New module">
          <section>
            <Form method="POST">
              <div className="mb-5">
                <Label htmlFor="title" className="mb-1">Module title</Label>
                <Input id="title" name="title" className="bg-white rounded" required />
                <InputError for="title" error={errors} />
              </div>

              <div className="mb-5">
                <Label htmlFor="position" className="mb-1">Position</Label>
                <Input id="position" name="position" type="number" className="bg-white rounded" />
                <InputError for="position" error={errors} />
              </div>

              <div className="mb-5">
                <Label htmlFor="description" className="mb-1">Overview/description</Label>
                <Textarea id="description" name="description" className="bg-white rounded" required />
                <InputError for="description" error={errors} />
              </div>
              <div className="mt-5">
                <Button type="submit" className="bg-secondary-foreground uppercase text-sm text-white w-full py-2 rounded-md cursor-pointer hover:bg-primary-foreground">
                  Create module
                  </Button>
              </div>
            </Form>
          </section>
        </TableCard>
      </div>
    </div>
  )
}

