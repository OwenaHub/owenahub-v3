import { Form, Link, redirect, useNavigation, type MetaFunction } from "react-router";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import type { Route } from "../../+types/root";
import loginUser from "./login";
import { Loader } from "lucide-react";
import InputError from "~/components/forms/input-error";
import { toast } from "sonner";
import { API_URL } from "~/lib/keys";
import useSession from "~/hooks/use-session";

export const meta: MetaFunction = () => {
    return [
        { title: "Login | OwenaHub" },
        { name: "description", content: "The Learner's Hub" },
    ];
};

export async function clientAction({ request }: Route.ClientActionArgs) {
    const formData = await request.formData();
    const credentials = Object.fromEntries(formData);

    const { getIntentedRoute } = useSession();
    let route = (await getIntentedRoute());

    try {
        await loginUser(credentials);
        toast("Welcome back!");
        return redirect(route);
    } catch ({ response }: any) {
        const error: any = response?.data?.errors;
        return error;
    }
}

export default function Login({ actionData }: Route.ComponentProps) {
    const errors = actionData;

    const { state } = useNavigation();
    const busy: boolean = state === "submitting" || state === "loading";

    const handleGoogleSignIn = () => {
        window.location.href = `${API_URL}/api/auth/google/redirect`;
    };

    return (
        <section className="container animated fadeIn">
            <div className="justify-center gap-10 items-center max-w-sm md:flex mx-auto py-10">
                <div className="flex-1">
                    <div className="border h-full rounded-xl md:px-8 px-5 py-6">
                        <div className="text-center pb-8">
                            <p className="text-2xl text-primary font-bold">
                                Log in to your account
                            </p>
                        </div>

                        <Button onClick={handleGoogleSignIn} variant={"outline"} className="flex p-5 w-full gap-2 items-center cursor-pointer">
                            <img src="/images/logos/google.png" alt="..." width="18" />
                            <span className="text-secondary-foreground font-bold">Sign In with Google</span>
                        </Button>

                        <div className="flex items-center py-5 mt-3">
                            <div className="flex-1 border-t" />
                            <div className="text-gray-400 text-xs font-bold mx-4">OR</div>
                            <div className="flex-1 border-t" />
                        </div>

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
                                <InputError for="email" error={errors} />
                            </div>
                            <div className="mb-5">
                                <div className="flex justify-between items-center pb-1">
                                    <Label className="text-xs">Password</Label>
                                    <Link to="/forgot-password" className="!text-primary text-xs underline underline-offset-2">
                                        Forgot password?
                                    </Link>
                                </div>
                                <Input
                                    className="py-5"
                                    id="password"
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    required
                                />
                            </div>
                            <div className="mt-7">
                                <Button
                                    disabled={busy}
                                    className="bg-[#fff7eb] border border-primary-theme hover:bg-white text-primary w-full font-semibold py-5 uppercase"
                                >
                                    {busy ? (<Loader className="animate-spin" />) : "Login"}
                                </Button>
                            </div>
                        </Form>



                        <div className="flex flex-col gap-3">
                            <p className="p-5 text-center text-pretty text-xs">
                                By continuing, you agree to our {" "}
                                <Link to="/terms-of-service">Terms</Link>
                                {" "}and{" "}
                                <Link to="/privacy-policy">Privacy Policy</Link>.
                            </p>
                        </div>
                    </div>
                    <div className="text-foreground text-sm py-5 flex items-center gap-1 justify-center">
                        <span>Need an account? </span>
                        <Link to="/register" className="text-gray-600 underline underline-offset-2 font-semibold" viewTransition>Register</Link>
                    </div>
                </div>
            </div>
        </section>
    )
}
