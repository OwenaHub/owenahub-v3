import { Form, Link, redirect, useNavigation, type MetaFunction } from "react-router";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import type { Route } from "../../+types/root";
import loginUser from "./login";
import { Loader } from "lucide-react";
import InputError from "~/components/forms/input-error";
import useSession from "~/lib/session";
import { toast } from "sonner";

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

    return (
        <section className="container animated fadeIn">
            <div className="justify-center gap-10 items-center max-w-sm md:flex mx-auto py-10">
                <div className="flex-1">
                    <div className="border h-full rounded-xl md:px-8 px-5 py-6">
                        <div className="text-center pb-5">
                            <p className="text-2xl text-primary-foreground font-bold">
                                Log in to your account
                            </p>
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
                                    autoFocus
                                />
                                <InputError for="email" error={errors} />
                            </div>
                            <div className="mb-5">
                                <div className="flex justify-between items-center pb-1">
                                    <Label className="text-xs">Password</Label>
                                    <Link to="/forgot-password" className="text-primary-foreground text-xs underline">
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
                                    className="bg-primary-foreground text-secondary-auxiliary w-full font-semibold py-5 uppercase"
                                >
                                    {busy ? (<Loader className="animate-spin" />) : "Login"}
                                </Button>
                            </div>
                        </Form>


                        <div className="flex items-center py-5">
                            <div className="flex-1 border-t" />
                            <div className="text-gray-400 text-xs font-bold mx-4">OR</div>
                            <div className="flex-1 border-t" />
                        </div>

                        <Button variant={"outline"} className="flex p-5 w-full gap-2 items-center">
                            <img src="/images/logos/google.png" alt="..." width="18" />
                            <span className="text-secondary-foreground font-bold">Sign up with Google</span>
                        </Button>

                        <div className="flex flex-col gap-3">
                            <p className="p-5 text-center text-pretty text-xs">
                                By continuing, you agree to our {" "}
                                <Link to="#" target="_blank" data-bypass>Terms</Link>
                                {" "}and{" "}
                                <Link to="/privacy" target="_blank">Privacy Policy</Link>.
                            </p>
                        </div>
                    </div>
                    <div className="text-center text-foreground text-sm font-semibold py-5 uppercase">
                        Need an account? <Link to="/register" className="text-primary-foreground" viewTransition>sign up</Link>
                    </div>
                </div>
            </div>
        </section>
    )
}
