import NavigateBack from "~/components/navigation/navigate-back";
import Menu from "./mentor-profile-menu";

export default function MentorProfileMenu() {
    return (
        <section>
            <NavigateBack to="account" />
            <Menu />
        </section>
    )
}
