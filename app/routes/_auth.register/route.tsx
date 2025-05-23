import { CheckCheck, Loader } from "lucide-react";
import { Form, Link, redirect, useNavigation, type MetaFunction } from "react-router";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import registerUser from "./register";
import InputError from "~/components/forms/input-error";
import { toast } from "sonner";
import { API_URL } from "~/lib/keys";
import type { Route } from "../_auth.register/+types/route";

export const meta: MetaFunction = () => {
    return [
        { title: "Register | OwenaHub" },
        { name: "description", content: "The Learner's Hub" },
    ];
};

export async function clientAction({ request }: Route.ClientActionArgs) {
    const formData = await request.formData();
    const credentials = Object.fromEntries(formData);

    try {
        await registerUser(credentials);
        toast("Congratulations! ✨", {
            description: "Your account has been registered"
        });
        return redirect('/dashboard');
    } catch ({ response }: any) {
        const error: any = response?.data?.errors;
        return error;
    }
}


export default function Register({ actionData }: Route.ComponentProps) {
    let errors = actionData;
    const { state } = useNavigation();
    const busy: boolean = state === "submitting" || state === "loading";

    const handleGoogleSignIn = () => {
        window.location.href = `${API_URL}/api/auth/google/redirect`;
    };

    return (
        <section className="container">
            <div className="justify-center gap-10 items-start max-w-fit md:flex mx-auto py-10">
                <div className="flex-1 hidden md:block">
                    <h1 className="text-2xl text-primary font-bold my-5 pb-5">
                        Sign up for free, <br className="hidden md:block" />
                        unlimited practice!
                    </h1>
                    <div className="flex flex-col gap-5">
                        <div className="flex gap-3 items-center">
                            <div className="bg-[#fff7eb] border-2 border-white p-1 rounded-full outline-1 outline-dotted outline-offset-2 outline-primary-theme">
                                <CheckCheck size="25" strokeWidth={"1.5"} className="text-primary" />
                            </div>
                            <p className="text-sm">
                                Unlimited access to free courses
                            </p>
                        </div>
                        <div className="flex gap-3 items-center">
                            <div className="bg-[#fff7eb] border-2 border-white p-1 rounded-full outline-1 outline-dotted outline-offset-2 outline-primary-theme">
                                <CheckCheck size="25" strokeWidth={"1.5"} className="text-primary" />
                            </div>
                            <p className="text-sm">
                                Instant feedback on assignments
                            </p>
                        </div>
                        <div className="flex gap-3 items-center">
                            <div className="bg-[#fff7eb] border-2 border-white p-1 rounded-full outline-1 outline-dotted outline-offset-2 outline-primary-theme">
                                <CheckCheck size="25" strokeWidth={"1.5"} className="text-primary" />
                            </div>
                            <p className="text-sm">
                                Expert tips to help you succeed
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex-1">
                    <div className="border h-full rounded-xl md:px-8 px-5 py-6">
                        <div className="text-center block md:hidden pb-8">
                            <p className="text-2xl text-primary font-bold">
                                Create an acccount
                            </p>
                            <p className="text-muted-foreground text-sm">to access your free acount</p>
                        </div>

                        <Button onClick={handleGoogleSignIn} variant={"outline"} className="flex p-5 w-full gap-2 items-center cursor-pointer">
                            <img src="/images/logos/google.png" alt="..." width="18" />
                            <span className="text-secondary-foreground font-bold">Register with Google</span>
                        </Button>

                        <div className="flex items-center py-5">
                            <div className="flex-1 border-t" />
                            <div className="text-gray-400 text-xs font-bold mx-4">OR</div>
                            <div className="flex-1 border-t" />
                        </div>

                        <Form method="POST">
                            <div className="mb-5">
                                <Input
                                    className="py-5"
                                    type="text"
                                    name="name"
                                    placeholder="Full name"
                                    required
                                />
                                <InputError for="name" error={errors} />
                            </div>
                            <div className="mb-5">
                                <Input
                                    className="py-5"
                                    type="email"
                                    name="email"
                                    placeholder="Email address"
                                    required
                                />
                                <InputError for="email" error={errors} />
                            </div>
                            <div className="mb-5">
                                <Input
                                    className="py-5"
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    required
                                />
                                <InputError for="password" error={errors} />
                            </div>
                            <div className="mb-5">
                                <Input
                                    className="py-5"
                                    type="password"
                                    name="password_confirmation"
                                    placeholder="Confirm password"
                                    required
                                />
                            </div>
                            <div className="mt-7">
                                <Button
                                    className="bg-[#fff7eb] border border-primary-theme text-primary hover:bg-white w-full font-semibold py-5 uppercase"
                                    disabled={busy}
                                >
                                    {busy ? (<Loader className="animate-spin" />) : "Register"}
                                </Button>
                            </div>
                        </Form>

                        <p className="p-4 text-center text-pretty text-xs">
                            By continuing, you agree to our {" "}
                            <Link to="/terms-of-service">Terms</Link>
                            {" "}and{" "}
                            <Link to="/privacy-policy">Privacy Policy</Link>.
                        </p>
                    </div>
                    <div className="text-foreground text-sm py-5 flex items-center gap-1 justify-center">
                        <span>Have an account?</span>{" "}
                        <Link to="/login" className="text-gray-600 underline underline-offset-2 font-semibold" viewTransition>Log in</Link>
                    </div>
                </div>
            </div>
        </section>
    )
}
