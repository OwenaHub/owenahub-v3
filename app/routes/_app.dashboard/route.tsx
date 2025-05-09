import { useOutletContext, type MetaFunction } from "react-router";
import ActiveUser from "./active-user";

export const meta: MetaFunction = () => {
    return [
        { title: "Dashboard | OwenaHub" },
        { name: "description", content: "The Learner's Hub" },
    ];
};

export default function Dashboard() {
    const user: User = useOutletContext();

    return (
        <section className="md:px-10 mt-10">
            <ActiveUser user={user} />
        </section>
    );
}
