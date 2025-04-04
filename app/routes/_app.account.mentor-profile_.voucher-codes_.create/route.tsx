import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Form, redirect } from "react-router";
import type { Route } from "../_app.account.mentor-profile_.voucher-codes_.create/+types/route";
import { toast } from "sonner";
import InputError from "~/components/forms/input-error";
import { Link } from "react-router";
import { ChevronLeft } from "lucide-react";
import { createVoucherCode } from "./create-vc";
import TableCard from "~/components/cards/table-card";

export async function clientAction({ request }: Route.ClientActionArgs) {
    const formData = Object.fromEntries(await request.formData());
    console.log(formData);

    try {
        await createVoucherCode(formData);
        toast("Voucher code created successfully")
        return redirect('/account/mentor-profile/voucher-codes')
    } catch ({ response }: any) {
        if (response?.status !== 422)
            toast("Something went wrong", {
                description: response?.data?.error || "Please try again",
            });

        console.log(response)
        const error: any = response?.data?.errors;
        return error;
    }
}

export default function CreateVoucherCode({ actionData }: Route.ComponentProps) {
    const errors = actionData;

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
                <TableCard header="Create code">
                    <Form encType="multipart/form-data" method="POST" >
                        <div className="mb-5">
                            <Label className="mb-1" htmlFor="issued_to">Issued to</Label>
                            <Input
                                className="rounded py-1"
                                id="issued_to"
                                type="email"
                                name="issued_to"
                                placeholder="user@email.com"
                            />
                            <InputError for="issued_to" error={errors} />
                        </div>
                        <div className="mb-5">
                            <Label className="mb-1" htmlFor="code">Voucher code</Label>
                            <Input
                                className="rounded py-1"
                                id="code"
                                type="text"
                                name="code"
                                maxLength={10}
                                required

                                onInput={(e) => {
                                    const input = e.target as HTMLInputElement;
                                    input.value = input.value.toUpperCase();
                                    const remaining = 10 - input.value.length;
                                    const counter = document.getElementById("code-counter");
                                    if (counter) counter.textContent = `${remaining} characters left`;
                                }}

                                onKeyDown={(e) => {
                                    if (e.key === " ") {
                                        e.preventDefault();
                                        const input = e.target as HTMLInputElement;
                                        input.value += "-";
                                    }
                                }}
                            />
                            <div id="code-counter" className="text-sm text-gray-500 mt-1">
                                10 characters left
                            </div>
                            <InputError for="code" error={errors} />
                        </div>
                        <div className="mb-5">
                            <Label className="mb-1" htmlFor="price">Attached price</Label>
                            <Input
                                className="rounded py-1"
                                type="number"
                                id="price"
                                name="price"
                            />
                            <InputError for="price" error={errors} />
                        </div>
                        <div className="mb-5">
                            <Label className="mb-1" htmlFor="expires_at">Code expiry</Label>
                            <Input
                                className="rounded py-1"
                                type="date"
                                id="expires_at"
                                name="expires_at"
                            />
                            <InputError for="price" error={errors} />
                        </div>
                        <div className="flex items-center pt-4 justify-between text-sm">
                            <Button variant={"outline"} type="reset" className="px-6 rounded mb-5 w-max uppercase">
                                reset
                            </Button>
                            <Button type="submit" className="px-6 rounded mb-5 w-max uppercase">
                                Create voucher code
                            </Button>
                        </div>
                    </Form>
                </TableCard>
            </div >
        </div >
    );
}
