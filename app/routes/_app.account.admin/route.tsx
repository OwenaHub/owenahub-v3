import NavigateBack from "~/components/navigation/navigate-back";
import AdminMenu from "./admin-menu";

export default function MentorProfileMenu() {
    return (
        <section className="animated fadeIn">
            <NavigateBack to="account" />
            <AdminMenu />
        </section>
    )
}
