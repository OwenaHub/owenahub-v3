import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export function formatRelativeDate(dateString: string) {
    const date = dayjs(dateString);
    const now = dayjs();

    if (date.isBefore(now, "day") || date.isSame(now, "day")) {
        return (<span className="text-green-700 font-semibold">In progress</span>);
    } else {
        return `Starting in ${date.fromNow(true)}`;
    }
}
