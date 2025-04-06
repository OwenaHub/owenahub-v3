import { Form, useOutletContext } from "react-router";
import { toast } from "sonner";
import NavigateBack from "~/components/navigation/navigate-back";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";
import { updateAccount } from "./update-account";
import type { Route } from "../_app.account.settings/+types/route";
import InputError from "~/components/forms/input-error";

export async function clientAction({ request }: Route.ClientLoaderArgs) {
    const formData = Object.fromEntries(await request.formData());
    try {
        await updateAccount(formData);
        toast.success("Account updated successfully!");
        return null;
    } catch ({ response }: any) {
        console.log(response);
        toast.error("Account update failed!");
        const error: any = response?.data?.errors;
        return error;
    }
}

export default function AccountSettings({ actionData }: Route.ComponentProps) {
    const user: User = useOutletContext();
    const errors = actionData;

    return (
        <div className="animated fadeIn my-10">
            <NavigateBack to="account" />
            <hr className="mt-5" />
            <Form method="POST" className="mt-8 flex flex-col md:flex-row gap-5">
                <div className="mb-2 md:w-2/3">
                    <div className="mb-7">
                        <Label className="font-medium mb-2">Full name</Label>
                        <Input placeholder="username" className="rounded cursor-not-allowed" defaultValue={user.name} disabled />
                        <small className="text-gray-500 text-xs font-light mt-1 leading-3">
                            Contact <a href="mailto:support@owenahub.com" className="underline">support@owenahub.com</a> to update your name
                        </small>
                        <InputError for="name" error={errors} />
                    </div>
                    <div className="mb-7">
                        <Label className="font-medium mb-2">Username</Label>
                        <Input placeholder="username" name="username" className="rounded" defaultValue={user.username} />
                        <small className="text-gray-500 text-xs font-light mt-1 leading-3">
                            This can be your real name or a pseudonym.
                        </small>
                        <InputError for="username" error={errors} />
                    </div>
                    <div className="mb-7">
                        <Label className="font-medium mb-2">Headline</Label>
                        <Input
                            placeholder="Student at Nile Institute"
                            name="title"
                            className="rounded"
                            defaultValue={user.title}
                        />
                        <InputError for="title" error={errors} />
                    </div>
                    <div className="mb-7">
                        <Label className="font-medium mb-2">Email</Label>
                        <Input placeholder="example@email.com" className="rounded cursor-not-allowed" defaultValue={user.email} disabled />
                        <small className="text-gray-500 text-xs font-light mt-1">
                            You can manage verified email addresses in your email settings.
                        </small>
                        <InputError for="email" error={errors} />
                    </div>
                    <div className="mb-7">
                        <Label className="font-medium mb-2">Bio</Label>
                        <Textarea placeholder="Write something captivating" name="biography" className="rounded" defaultValue={user.biography} />
                        <small className="text-gray-500 text-xs font-light mt-1">
                            You can @mention other users and organizations to link to them.
                        </small>
                        <InputError for="biography" error={errors} />
                    </div>

                    <Button className="rounded">
                        Update profile
                    </Button>
                </div>

            </Form>
        </div>
    )
}
