import { Form, Link, redirect, useNavigation, useSearchParams, type MetaFunction } from "react-router";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Loader } from "lucide-react";
import InputError from "~/components/forms/input-error";
import { toast } from "sonner";
import { resetPassword } from "./password-reset";
import type { Route } from "../_auth.password-reset.$token/+types/route";

export const meta: MetaFunction = () => {
    return [
        { title: "Reset Password | OwenaHub" },
        { name: "description", content: "The Learner's Hub" },
    ];
};

export async function clientAction({ request }: Route.ClientActionArgs) {
    const formData = await request.formData();
    const credentials = Object.fromEntries(formData);

    console.log(credentials);

    try {
        await resetPassword(credentials).then(({ data }) => {
            toast.success("Password updated", {
                description: data.status || "Updated successfully",
            });
        }
        );

        return redirect('/login');
    } catch ({ response }: any) {
        const error: any = response?.data?.errors;
        return error;
    }
}

export default function Login({ actionData, params }: Route.ComponentProps) {
    const errors = actionData;

    const [searchParams, _] = useSearchParams();

    const { state } = useNavigation();
    const busy: boolean = state === "submitting" || state === "loading";

    return (
        <section className="container animated fadeIn">
            <div className="justify-center gap-10 items-center max-w-sm md:flex mx-auto py-10">
                <div className="flex-1">
                    <div className="border h-full rounded-xl md:px-8 px-5 py-6">
                        <div className="text-center pb-8">
                            <p className="text-2xl text-primary font-bold">
                                Reset Your Password
                            </p>
                            <p className="text-sm font-light mt-2 text-secondary-foreground">
                                Password reset for <span className="font-semibold">{searchParams.get("email")}</span>.
                            </p>
                        </div>
                        <Form method="POST">
                            <input type="hidden" name="token" value={params.token} />
                            <input
                                type="hidden"
                                name="email"
                                value={searchParams.get('email') as string}
                            />
                            <div className="mb-5">
                                <Label className="text-xs pb-1" htmlFor="password">
                                    New password
                                </Label>

                                <Input
                                    className="py-5"
                                    id="password"
                                    type="password"
                                    name="password"
                                    placeholder="********"
                                    required
                                />
                                <InputError for="password" error={errors} />
                            </div>
                            <div className="mb-5">
                                <Label className="text-xs pb-1">Confirm password</Label>
                                <Input
                                    className="py-5"
                                    id="email"
                                    type="password"
                                    name="confirm_password"
                                    placeholder="********"
                                    required
                                />
                            </div>
                            <div className="mt-7">
                                <Button
                                    disabled={busy}
                                    className="bg-[#fff7eb] border border-primary-theme hover:bg-white text-primary w-full font-semibold py-5 uppercase"
                                >
                                    {busy ? (<Loader className="animate-spin" />) : "Reset Password"}
                                </Button>
                            </div>
                        </Form>

                        <div className="flex flex-col gap-3">
                            <p className="p-5 text-center text-pretty text-xs">
                                <Link to="/terms-of-service">Terms</Link>
                                {" "}and{" "}
                                <Link to="/privacy-policy">Privacy Policy</Link>.
                            </p>
                        </div>
                    </div>
                    <div className="text-center text-foreground text-sm font-semibold py-5 uppercase">
                        Need an account? <Link to="/login" className="text-gray-600 underline underline-offset-1" viewTransition>log in</Link>
                    </div>
                </div>
            </div>
        </section>
    )
}
