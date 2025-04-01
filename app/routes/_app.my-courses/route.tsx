import type { MetaFunction } from "react-router";

export const meta: MetaFunction = () => {
    return [
        { title: "Courses | OwenaHub" },
        { name: "description", content: "The Learner's Hub" },
    ];
};

export default function Courses() {
    return (
        <section className="md:px-10 mt-10">
            <section>
                <div className="md:mt-20 mb-8 flex gap-8 justify-between items-start">
                    <div>
                        <h4 className="text-xl text-primary-foreground mb-3 font-bold">
                            Courses
                        </h4>
                        <p className="text-sm leading-4">
                            Here are coureses you have enrolled in
                        </p>
                    </div>
                </div>
            </section>
        </section>
    )
}
