import dayjs from "dayjs";
import { CircleCheck, Copy, EllipsisVertical, GraduationCap, HandCoins, ShieldUser, Trash2, User } from "lucide-react"
import { Form, Link } from "react-router";
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

export function UsersTable({ users }: { users: User[] }) {
    return (
        <Table>
            <TableCaption>A list of your voucher codes.</TableCaption>
            <TableHeader className="bg-gray-100">
                <TableRow>
                    <TableHead className="w-[200px]">Email</TableHead>
                    <TableHead className="w-max">Name</TableHead>
                    <TableHead>Email status</TableHead>
                    <TableHead>Username</TableHead>
                    <TableHead className="text-left">Date joined</TableHead>
                    <TableHead className="text-left">Account type</TableHead>
                    <TableHead className="text-right"></TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {users.length
                    ? (
                        <>
                            {users.map((user: User) => (
                                <TableRow key={user.id}>
                                    <TableCell className="font-medium">{user.email}</TableCell>
                                    <TableCell className="">{user.name}</TableCell>
                                    <TableCell>
                                        <CodeStatus verified={user.emailVerifiedAt} />
                                    </TableCell>
                                    <TableCell>
                                        {user.username || <span className="text-gray-300">N/A</span>}
                                    </TableCell>
                                    <TableCell>
                                        {user.createdAt
                                            ? dayjs(user.createdAt).format("DD/MM/YYYY")
                                            : <span className="text-gray-300">N/A</span>
                                        }
                                    </TableCell>
                                    <TableCell className="text-left">
                                        <div className="px-2 py-1">
                                            <AccountType type={user.accountType} />
                                        </div>
                                    </TableCell>

                                    <TableCell className="text-nowrap text-right">
                                        <button className="rounded-full hover:bg-gray-200 transition" title="Actions">
                                            <PopoverMenu user={user} />
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

function CodeStatus({ verified }: { verified: string | null }) {
    return (
        <>
            {verified ? (
                <span className="flex w-max gap-2 items-center border-green-700 bg-green-50 text-green-900 px-2 border rounded-lg py-1 text-xs uppercase font-medium">
                    <CircleCheck size={14} fill="green" className="text-white" /> verified
                </span>
            )
                : (
                    <span className="flex w-max gap-2 items-center border-gray-700 bg-gray-50 text-gray-900 px-2 border rounded-lg py-1 text-xs uppercase font-medium">
                        <CircleCheck size={14} fill="dark-grey" className="text-white" /> unverified
                    </span>
                )

            }
        </>
    )
}

function AccountType({ type }: { type: 'user' | 'mentor' | 'admin' }) {
    return (
        <>
            <>
                {type === "user" && (
                    <span className="flex w-max gap-2 items-center border-green-700 bg-green-50 text-green-900 px-2 border rounded-lg py-1 text-xs uppercase font-medium">
                        <User size={18} fill="green" className="text-white" /> {type}
                    </span>
                )}
                {type === "mentor" && (
                    <span className="flex w-max gap-2 items-center border-gray-700 bg-gray-50 text-gray-900 px-2 border rounded-lg py-1 text-xs uppercase font-medium">
                        <GraduationCap size={18} fill="dark-grey" className="text-white" /> {type}
                    </span>
                )}
                {type === "admin" && (
                    <span className="flex w-max gap-2 items-center border-red-700 bg-red-50 text-red-900 px-2 border rounded-lg py-1 text-xs uppercase font-medium">
                        <ShieldUser size={18} fill="red" className="text-white" /> {type}
                    </span>
                )}
            </>
        </>
    )
}

export function PopoverMenu({ user }: { user: User }) {
    function copyToClipboard() {
        navigator.clipboard.writeText(user.email)
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
                        <span>Copy email</span>
                    </button>
                </div>
                <div className="border-b">
                    <Link
                        to={{
                            pathname: "/account/mentor-profile/voucher-codes/create",
                            search: `?email=${user.email}`,
                        }}
                        className="flex items-center gap-2 p-2 hover:bg-gray-100 w-full">
                        <HandCoins size={18} />
                        <span>Create voucher</span>
                    </Link>
                </div>
                <Form method="POST" action={`${user.id}/delete`} className="hover:bg-red-50">
                    <Button type="submit" variant={"ghost"} className="flex items-center rounded-t-none gap-2 p-2 hover:bg-destructive-foreground !text-destructive">
                        <Trash2 size={18} />
                        <span>Delete user</span>
                    </Button>
                </Form>
            </PopoverContent>
        </Popover>
    )
}
