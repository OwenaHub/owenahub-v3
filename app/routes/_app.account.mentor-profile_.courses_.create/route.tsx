import { ArrowRight, ChevronLeft } from "lucide-react";
import { Form, Link, redirect, useNavigate } from "react-router";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";
import type { Route } from "../_app.account.mentor-profile_.courses_.create/+types/route";
import { createCourse } from "./create-course";
import { toast } from "sonner";
import InputError from "~/components/forms/input-error";

export async function clientAction({ request }: Route.ClientActionArgs) {
    const formData = Object.fromEntries(await request.formData());
    const navigate = useNavigate();

    try {
        await createCourse(formData);
        toast.success("Course created", {
            description: "Proceed to adding Modules",
            action: {
                label: (<ArrowRight size={18} />),
                onClick: () => navigate("/courses"),
            },
        });
        return redirect('/courses')
    } catch ({ response }: any) {
        toast.error("Failed to create course", {
            description: "Review the form and try again",
        });
        const error: any = response?.data?.errors;
        return error;
    }
}

export default function route({ actionData }: Route.ComponentProps) {
    let errors = actionData;

    return (
        <div className="pb-10 pt-5">
            <h4 className="text-base text-primary-foreground font-bold mb-8">
                <Link
                    to="/account/mentor-profile/courses"
                    className="flex items-center gap-1"
                >
                    <ChevronLeft size={18} strokeWidth={2} />
                    <span>Create course</span>
                </Link>
            </h4>

            <div className="rounded-lg bg-gray-50 p-6 border">
                <Form encType="multipart/form-data" method="POST">
                    <div className="mb-5">
                        <Label htmlFor="title" className="mb-1">Course title</Label>
                        <Input id="title" name="title" className="bg-white rounded" />
                        <InputError for="title" error={errors} />
                    </div>
                    <div className="mb-5">
                        <Label htmlFor="about" className="mb-1">Course about</Label>
                        <Input id="about" name="about" className="bg-white rounded" />
                        <InputError for="about" error={errors} />
                    </div>
                    <div className="mb-5 md:flex gap-4">
                        <div className="flex-1">
                            <Label htmlFor="tags" className="mb-1">Tags (These can be related keywords)</Label>
                            <Input id="tags" name="tags" className="bg-white rounded" />
                            <InputError for="tags" error={errors} />
                        </div>
                        <div className="flex-1">
                            <Label htmlFor="thumbnail" className="mb-1">Thumbnail</Label>
                            <Input type="file" id="thumbnail" name="thumbnail" className="inline-block !min-h-full bg-white rounded" />
                            <InputError for="thumbnail" error={errors} />
                        </div>
                    </div>
                    <div className="mb-5">
                        <Label htmlFor="learning_goals" className="mb-1">Students learning goal</Label>
                        <Input id="learning_goals" name="learning_goals" className="bg-white rounded" />
                        <InputError for="learning_goals" error={errors} />
                    </div>
                    <div className="mb-5">
                        <Label htmlFor="requiremnts" className="mb-1">Course requiremnts</Label>
                        <Textarea id="requiremnts" name="requiremnts" className="bg-white rounded" />
                        <InputError for="requirements" error={errors} />
                    </div>
                    <div className="mb-5">
                        <Label htmlFor="description" className="mb-1">Overview/description</Label>
                        <Textarea id="description" name="description" className="bg-white rounded" />
                        <InputError for="description" error={errors} />
                    </div>

                    <div className="mb-5">
                        <Label htmlFor="start_date" className="mb-1">Start date</Label>
                        <Input type="date" id="start_date" name="start_date" className="bg-white rounded" />
                        <InputError for="start_date" error={errors} />
                    </div>
                    <div className="mb-5">
                        <Label htmlFor="end_date" className="mb-1">End date</Label>
                        <Input type="date" id="end_date" name="end_date" className="bg-white rounded" />
                        <InputError for="end_date" error={errors} />
                    </div>

                    <div className="mt-10">
                        <button type="submit" className="bg-primary-foreground text-white w-full py-2 rounded">Create course</button>
                    </div>
                </Form>
            </div >
        </div >
    )
}
