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
                        <h1 className="text-xl md:text-2xl text-primary-theme mb-3 font-bold">
                            My courses
                        </h1>
                        <p className="text-sm leading-4">
                            Here are coureses you have enrolled in
                        </p>
                    </div>
                </div>
            </section>
        </section>
    )
}
