import TableCard from "~/components/cards/table-card";
import NavigateBack from "~/components/navigation/navigate-back";

export default function route() {
    return (
        <section>
            <NavigateBack to="account/mentor-profile" />
            <div className="pb-4">
                <TableCard header="Courses" cta="Create course" ctaLink="create">
                    hello
                </TableCard>
            </div>
        </section>
    )
}
