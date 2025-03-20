import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "~/components/ui/popover"

import { Button } from "~/components/ui/button"
import { Switch } from "~/components/ui/switch"

import {
    Bell,
    BellRing,
    Check
} from "lucide-react"

import { cn } from "~/lib/utils"
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "~/components/ui/card"
import { Suspense } from "react";
import { Await } from "react-router";
import TextSkeleton from "~/components/skeletons/text-skeleton";

type CardProps = React.ComponentProps<typeof Card> & {
    notifications: Notification[];
};

import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";

dayjs.extend(relativeTime);


export default function AppNotification({ className, notifications, ...props }: CardProps) {

    return (
        <Popover>
            <PopoverTrigger asChild>
                <div className="p-2 rounded-full hover:bg-gray-100 cursor-pointer">
                    <div className='relative'>
                        <Bell className="fill-secondary" size={28} strokeWidth={0.5} />
                        <span className="h-2.5 w-2.5 absolute top-0 right-0.5 rounded-full bg-destructive border border-white" />
                    </div>
                </div>
            </PopoverTrigger>
            <PopoverContent className="w-max p-0 border-0 shadow-2xl rounded-none">
                <Card className={cn("w-[380px]", className)} {...props}>
                    <CardHeader>
                        <CardTitle>Notifications</CardTitle>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                        <div className=" flex items-center space-x-4 rounded-md border p-4">
                            <BellRing />
                            <div className="flex-1 space-y-1">
                                <p className="text-sm font-medium leading-none">
                                    Push Notifications
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    Send notifications to device.
                                </p>
                            </div>
                            <Switch disabled checked />
                        </div>
                        <div>
                            <Suspense fallback={<TextSkeleton lineCount={2} />}>
                                <Await resolve={notifications}>
                                    {(notifications) => (
                                        <>
                                            {notifications.length ? (
                                                (
                                                    notifications.map((notification, index) => (
                                                        <div
                                                            key={index}
                                                            className="grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"                                                        >
                                                            {!notification.is_read
                                                                && (<span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />)
                                                            }
                                                            <div className="space-y-1">
                                                                <p className="text-sm font-medium leading-5">
                                                                    {notification.content}
                                                                </p>
                                                                <p className="text-sm text-gray-400">
                                                                    {dayjs(notification.created_at).fromNow()}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    ))
                                                ))
                                                : <p className="text-gray-400 text-sm py-1.5">
                                                    No notifications here yet.
                                                </p>
                                            }
                                        </>
                                    )}
                                </Await>
                            </Suspense>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button className="w-full" variant={"secondary"} disabled>
                            <Check /> Mark all as read
                        </Button>
                    </CardFooter>
                </Card>
            </PopoverContent>
        </Popover>
    )
}
