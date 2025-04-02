import { ChevronLeft } from "lucide-react";
import { Form, Link, redirect } from "react-router";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import type { Route } from "./+types/route";
import { toast } from "sonner";
import InputError from "~/components/forms/input-error";
import TableCard from "~/components/cards/table-card";
import { getCourse, updateCourse } from "./udpate-course";
import { useState } from "react";
import { TextEditor } from "~/components/custom/quill.client";

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
    try {
        if (!params.ulid) {
            toast.warning('Invalid request');
            return redirect('/account/mentor-profile/courses')
        }
        const course = await getCourse(params.ulid);
        return course;
    } catch ({ response }: any) {
        console.log(response);
        toast.warning("Failed to load resource")
    }
}

export async function clientAction({ request, params }: Route.ClientActionArgs) {
    const formData = Object.fromEntries(await request.formData());
    formData.courseId = params.ulid;

    try {
        const c = await updateCourse(formData);
        console.log(c);

        toast.success("Course updated");
        return redirect(`/account/mentor-profile/courses/${params.ulid}`)
    } catch ({ response }: any) {
        toast.error("Failed to update course", {
            description: response?.data?.error || "Review the form and try again",
        });
        const error: any = response?.data?.errors;
        return error;
    }
}

export default function MentorEditCourse({ loaderData, actionData }: Route.ComponentProps) {
    const errors = actionData;
    const course: Course | any = loaderData;

    const [learningGoals, setLearningGoals] = useState(course.learningGoals);
    const [description, setDescription] = useState(course.description);
    const [requirements, setRequirements] = useState(course.requirements);

    return (
        <div className="pb-10 pt-5">
            <Link
                to="/account/mentor-profile/courses"
                className="flex items-center gap-1 text-sm font-light mb-8 uppercase"
            >
                <ChevronLeft size={18} strokeWidth={2} />
                <span>Courses</span>
            </Link>

            <div>
                <TableCard header="Create course">
                    <Form encType="multipart/form-data" method="POST">
                        <div className="mb-5">
                            <Label htmlFor="title" className="mb-1">Course title</Label>
                            <Input defaultValue={course.title} id="title" name="title" className="bg-white rounded-md" required />
                            <InputError for="title" error={errors} />
                        </div>
                        <div className="mb-5">
                            <Label htmlFor="about" className="mb-1">Course about</Label>
                            <Input defaultValue={course.about} id="about" name="about" className="bg-white rounded-md" required />
                            <InputError for="about" error={errors} />
                        </div>
                        <div className="mb-5 md:flex gap-4">
                            <div className="flex-1">
                                <Label htmlFor="tags" className="mb-1">Tags (These can be related keywords)</Label>
                                <Input defaultValue={course.tags} id="tags" name="tags" className="bg-white rounded-md" required />
                                <InputError for="tags" error={errors} />
                            </div>
                            <div className="flex-1">
                                <Label htmlFor="thumbnail" className="mb-1">Thumbnail</Label>
                                <Input type="file" id="thumbnail" name="thumbnail" className="bg-white rounded-md" />
                                <InputError for="thumbnail" error={errors} />
                            </div>
                        </div>
                        <div className="mb-5">
                            <Label htmlFor="learning_goals" className="mb-1">Students learning goal</Label>
                            <TextEditor
                                theme="snow"
                                placeholder="What your students will accomplish after they finish your course"
                                onChange={setLearningGoals}
                                value={learningGoals}
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
                            <input type="hidden" name="learning_goals" value={learningGoals} />
                            <InputError for="learning_goals" error={errors} />
                        </div>
                        <div className="mb-5">
                            <Label htmlFor="requirements" className="mb-1">Course requirements</Label>
                            <TextEditor
                                theme="snow"
                                placeholder="Define requirements for a student to enroll"
                                onChange={setRequirements}
                                value={requirements}
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
                            <input type="hidden" name="requirements" value={requirements} />
                            <InputError for="requirements" error={errors} />
                        </div>
                        <div className="mb-5">
                            <Label htmlFor="description" className="mb-1">Overview/description</Label>
                            <TextEditor
                                theme="snow"
                                placeholder="Write a comprehensive course description"
                                onChange={setDescription}
                                value={description}
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
                            <input type="hidden" name="description" value={description} />
                            <InputError for="description" error={errors} />
                        </div>

                        <div className="mb-5 md:flex gap-4">
                            <div className="flex-1">
                                <Label htmlFor="start_date" className="mb-1">Start date</Label>
                                <Input defaultValue={course.startDate} type="date" id="start_date" name="start_date" className="bg-white rounded-md" />
                                <InputError for="start_date" error={errors} />
                            </div>
                            <div className="flex-1">
                                <Label htmlFor="price" className="mb-1">Price</Label>
                                <Input defaultValue={parseInt(course.price)} type="number" id="price" name="price" className="bg-white rounded-md" />
                                <InputError for="price" error={errors} />
                            </div>
                        </div>

                        <div className="mt-10">
                            <button type="submit" className="bg-secondary-foreground hover:bg-primary-foreground text-white w-full py-2 rounded-md">Update course</button>
                        </div>
                    </Form>
                </TableCard>
            </div >
        </div >
    )
}
