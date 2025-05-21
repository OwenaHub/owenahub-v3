import { Form, Link, useNavigation, useSearchParams, type MetaFunction } from "react-router";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import type { Route } from "../../+types/root";
import { Loader } from "lucide-react";
import InputError from "~/components/forms/input-error";
import { toast } from "sonner";
import { sendEmailRequest } from "./forgot-password";

export const meta: MetaFunction = () => {
    return [
        { title: "Forgot Password | OwenaHub" },
        { name: "description", content: "The Learner's Hub" },
    ];
};

export async function clientAction({ request }: Route.ClientActionArgs) {
    const formData = await request.formData();
    const credentials = Object.fromEntries(formData);

    try {
        const { data } = await sendEmailRequest(credentials);
        toast.success("Request successful", {
            description: data.status || "Email sent successfully",
        });
        return { status: "sent" };
    } catch ({ response }: any) {
        const errors: any = response?.data?.errors;
        return { errors };
    }
}

export default function Login({ actionData }: Route.ComponentProps) {
    const formStatus: any = actionData;
    
    const [searchParams] = useSearchParams();

    if (formStatus?.status === "sent") {
        searchParams.set("status", "sent");
        window.history.replaceState({}, "", `?${searchParams}`);
    }

    const { state } = useNavigation();
    const busy: boolean = state === "submitting" || state === "loading";

    return (
        <section className="container animated fadeIn">
            <div className="justify-center gap-10 items-center max-w-sm md:flex mx-auto py-10">
                <div className="flex-1">
                    <div className="border h-full rounded-xl md:px-8 px-5 py-6">
                        <div className="text-center pb-8">
                            <p className="text-2xl text-primary font-bold">
                                Forgot Password
                            </p>
                        </div>

                        {searchParams.get("status") === "sent"
                            ? (
                                <div className="mt-7">
                                    <p className="mb-5 text-sm">
                                        Check your email for a link to reset your password.
                                        If you don't see it, check your spam folder or {" "}
                                        <Link to={"#"} className="font-bold underline" onClick={() => searchParams.delete("status")}>try again</Link>.
                                    </p>
                                    <Button
                                        onClick={() => {
                                            window.open("https://mail.google.com", "_blank");
                                        }}
                                        type="button"
                                        disabled={busy}
                                        className="bg-[#fff7eb] border border-primary-theme hover:bg-white text-primary w-full font-semibold py-5 uppercase"
                                    >
                                        Open email
                                    </Button>
                                </div>
                            )
                            : (
                                <Form method="POST">
                                    <div className="mb-5">
                                        <Label className="text-xs pb-1">Email address</Label>
                                        <Input
                                            className="py-5"
                                            id="email"
                                            type="email"
                                            name="email"
                                            placeholder="m@example.com"
                                            required
                                        />
                                        <InputError for="email" error={formStatus?.errors} />
                                    </div>
                                    <div className="mt-7">
                                        <Button
                                            disabled={busy}
                                            className="bg-[#fff7eb] border border-primary-theme hover:bg-white text-primary w-full font-semibold py-5 uppercase"
                                        >
                                            {busy ? (<Loader className="animate-spin" />) : "Send email"}
                                        </Button>
                                    </div>
                                </Form>
                            )}

                        <div className="flex flex-col gap-3">
                            <p className="p-5 text-center text-pretty text-xs">
                                <Link to="/terms-of-service">Terms</Link>
                                {" "}and{" "}
                                <Link to="/privacy-policy">Privacy Policy</Link>.
                            </p>
                        </div>
                    </div>
                    <div className="text-foreground text-sm py-5 flex items-center gap-1 justify-center">
                        <span>Have an account?</span>{" "}
                        <Link to="/login" className="text-gray-600 underline underline-offset-2 font-semibold" viewTransition>Log in</Link>
                    </div>
                </div >
            </div >
        </section >
    )
}
