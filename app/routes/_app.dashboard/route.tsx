import { useOutletContext, type MetaFunction } from "react-router";
import ActiveUser from "./active-user";
import { getLessonActivity } from "~/lib/user-activity";
import DefaultUser from "./default-user";
import type { Route } from "../_app.dashboard/+types/route";

export const meta: MetaFunction = () => {
    return [
        { title: "Dashboard | OwenaHub" },
        { name: "description", content: "The Learner's Hub" },
    ];
};

export async function clientLoader() {
    const isActiveUser = await getLessonActivity();
    return { isActiveUser }
}

export default function Dashboard({ loaderData }: Route.ComponentProps) {
    const user: User = useOutletContext();
    const { isActiveUser } = loaderData;

    return (
        <section className="md:px-10 mt-10">
            {isActiveUser
                ? <ActiveUser
                    user={user}
                    activity={isActiveUser}
                />
                : <DefaultUser />
            }
        </section>
    );
}
