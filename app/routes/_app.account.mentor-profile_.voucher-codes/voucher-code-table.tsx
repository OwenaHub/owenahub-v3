import dayjs from "dayjs";
import { CircleCheck, Copy, EllipsisVertical, Trash2, TriangleAlert } from "lucide-react"
import { Form } from "react-router";
import { toast } from "sonner";
import { Button } from "~/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "~/components/ui/popover";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "~/components/ui/table";

export function VoucherCodeTable({ voucherCodes }: { voucherCodes: VoucherCode[] }) {
    return (
        <Table>
            <TableCaption>A list of your voucher codes.</TableCaption>
            <TableHeader className="bg-gray-100">
                <TableRow>
                    <TableHead className="w-[200px]">Code</TableHead>
                    <TableHead className="w-max">Status</TableHead>
                    <TableHead>Issued to</TableHead>
                    <TableHead>Expiry</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead className="text-right"></TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {voucherCodes.length
                    ? (
                        <>
                            {voucherCodes.map((code: VoucherCode) => (
                                <TableRow key={code.id}>
                                    <TableCell className="font-medium">{code.code}</TableCell>
                                    <TableCell>
                                        <CodeStatus status={code.status} />
                                    </TableCell>
                                    <TableCell>
                                        {code.issuedTo || <span className="text-gray-300">N/A</span>}
                                    </TableCell>
                                    <TableCell>
                                        {code.expiresAt ? dayjs(code.expiresAt).format("DD/MM/YYYY") : <span className="text-gray-300">N/A</span>}
                                    </TableCell>
                                    <TableCell className="text-right font-semibold">
                                        {code.price ? (
                                            <>
                                                ₦{parseInt(code.price).toLocaleString()}
                                            </>
                                        ) : <span className="text-gray-300">N/A</span>}
                                    </TableCell>

                                    <TableCell className="text-nowrap text-right">
                                        <button className="rounded-full hover:bg-gray-200 transition" title="Actions">
                                            <PopoverMenu voucherCode={code} />
                                        </button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </>
                    )
                    : (<TableRow>
                        <TableCell colSpan={6} >No codes</TableCell>
                    </TableRow>
                    )}

            </TableBody>
        </Table>
    );
}


function CodeStatus({ status }: { status: "unused" | "redeemed" | "expired" }) {
    return (
        <>
            {status === "redeemed" && (
                <span className="flex w-max gap-2 items-center border-green-700 bg-green-50 text-green-900 px-2 border rounded-lg py-1 text-xs uppercase font-medium">
                    <CircleCheck size={14} fill="green" className="text-white" /> {status}
                </span>
            )}
            {status === "unused" && (
                <span className="flex w-max gap-2 items-center border-gray-700 bg-gray-50 text-gray-900 px-2 border rounded-lg py-1 text-xs uppercase font-medium">
                    <CircleCheck size={14} fill="dark-grey" className="text-white" /> {status}
                </span>
            )}
            {status === "expired" && (
                <span className="flex w-max gap-2 items-center border-red-700 bg-red-50 text-red-900 px-2 border rounded-lg py-1 text-xs uppercase font-medium">
                    <TriangleAlert size={14} fill="red" className="text-white" /> {status}
                </span>
            )}
        </>
    )
}

export function PopoverMenu({ voucherCode }: { voucherCode: VoucherCode }) {
    function copyToClipboard() {
        navigator.clipboard.writeText(voucherCode.code)
            .then(() => toast("Copied to clipboard"))
            .catch(err => {
                console.error(err);
                toast("Copying unavailable")
            });
    }

    return (
        <Popover>
            <PopoverTrigger asChild className="p-1 rounded-full hover:bg-gray-100">
                <EllipsisVertical size={30} />
            </PopoverTrigger>
            <PopoverContent className="w-max cursor-pointer p-0 text-sm">
                <div className="border-b">
                    <button onClick={() => copyToClipboard()} className="flex items-center gap-2 p-2 hover:bg-gray-100 w-full">
                        <Copy size={18} />
                        <span>Copy code</span>
                    </button>
                </div>
                <Form method="POST" action={`${voucherCode.id}/delete`} className="">
                    <Button type="submit" variant={"ghost"} className="flex items-center rounded-t-none gap-2 p-2 hover:bg-destructive-foreground !text-destructive">
                        <Trash2 size={18} />
                        <span>Remove code</span>
                    </Button>
                </Form>
            </PopoverContent>
        </Popover>
    )
}
