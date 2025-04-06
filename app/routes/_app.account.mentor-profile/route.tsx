import NavigateBack from "~/components/navigation/navigate-back";
import Menu from "./mentor-profile-menu";

export default function MentorProfileMenu() {
    return (
        <section className="animated fadeIn">
            <NavigateBack to="account" />
            <Menu />
        </section>
    )
}
