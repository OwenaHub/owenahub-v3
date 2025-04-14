import { redirect } from "react-router";
import type { Route } from "../_guest.courses_.$ulid/+types/route";
import { getCourse } from "./get-courses";
import CourseBanner from "./course-banner";
import Tags from "~/components/custom/tags";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "~/components/ui/accordion"
import { MonitorSmartphone, SquarePlay, Text, Trophy, TvMinimalPlay, Users, Wrench } from "lucide-react";
import CustomAvatar from "~/components/custom/custom-avatar";
import { FormatLineBreaks } from "~/components/utility/format-text";

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
    try {
        const { data, isEnrolled } = await getCourse(params.ulid);
        return { course: data, isEnrolled }
    } catch ({ response }: any) {
        console.log(response);
        return redirect('/')
    }
}
export default function GuestViewCourse({ loaderData }: Route.ComponentProps) {
    const { course, isEnrolled }: { course: Course, isEnrolled: boolean } = loaderData;

    return (
        <div>
            <CourseBanner course={course} isEnrolled={isEnrolled} />

            <div className="container flex flex-col gap-10 mt-8">
                <section className="mt-8 md:w-2/3 inline-block">
                    <div className="border border-gray-300 p-4">
                        <h4 className="font-bold text-xl mb-3">What you'll learn</h4>
                        <div className="text-sm" dangerouslySetInnerHTML={{ __html: course.learningGoals || "" }} />
                    </div>
                </section>

                <div className="md:w-2/3">
                    <h4 className="font-bold text-xl mb-4">Other related topics</h4>
                    <div>
                        <Tags args={course.tags} />
                    </div>
                </div>

                <div className="md:w-2/3">
                    <h4 className="font-bold text-xl mb-4">What you get:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-0">
                        <div className="flex items-center gap-4 text-sm">
                            <Users strokeWidth={1} />
                            <span>Professional mentors</span>
                        </div>
                        <div className="flex items-center gap-4 text-sm">
                            <Trophy strokeWidth={1} />
                            <span>Certificate of completion</span>
                        </div>
                        <div className="flex items-center gap-4 text-sm">
                            <MonitorSmartphone strokeWidth={1} />
                            <span>Access on mobile and TV</span>
                        </div>
                        <div className="flex items-center gap-4 text-sm">
                            <TvMinimalPlay strokeWidth={1} />
                            <span>Hours of on-demand video</span>
                        </div>
                        <div className="flex items-center gap-4 text-sm">
                            <Wrench strokeWidth={1} />
                            <span>Hands on projects</span>
                        </div>
                    </div>
                </div>

                <div className="md:w-2/3">
                    <h4 className="font-bold text-xl mb-4">Course content</h4>
                    <div className="text-sm font-light mb-4">
                        {course.modules.length} modules • {" "}
                        {course.modules.reduce((count, module) => count + module.lessons.length, 0)} lessons •
                        5h+ course total length
                    </div>
                    <Accordion type="single" collapsible defaultValue="item-1" className="w-full border">
                        {course.modules.map((module, index) => (
                            <AccordionItem value={`item-${index + 1}`} key={module.id}>
                                <AccordionTrigger className="px-5 bg-muted rounded-none">{module.title}</AccordionTrigger>
                                <AccordionContent className="p-5 flex flex-col gap-4">
                                    {module.lessons.map((lesson: Lesson) => {
                                        const wordsPerMinute = 150; // Average reading speed
                                        const wordCount = lesson.content?.split(' ').length || 0;
                                        const estimatedMinutes = Math.ceil(wordCount / wordsPerMinute);

                                        return (
                                            <div key={lesson.id} className="text-xs my-1 font-light flex items-center justify-between">
                                                <div className="font-light flex items-center gap-3">
                                                    {lesson.videoUrl
                                                        ? (<>
                                                            <SquarePlay strokeWidth={1} size={18} />
                                                        </>
                                                        )
                                                        : (<>
                                                            <Text strokeWidth={1} size={18} />
                                                        </>)
                                                    }
                                                    <span>{lesson.title}</span>
                                                </div>
                                                <div className="text-nowrap text-gray-400">
                                                    {estimatedMinutes}:00
                                                </div>
                                            </div>
                                        );
                                    })}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>

                <div className="md:w-2/3">
                    <h4 className="font-bold text-xl mb-4">Requirements</h4>
                    <div className="text-sm" dangerouslySetInnerHTML={{ __html: course.requirements || "" }} />
                </div>

                <div className="md:w-2/3">
                    <h4 className="font-bold text-xl mb-4">Description</h4>
                    <div className="text-sm" dangerouslySetInnerHTML={{ __html: course.description || "" }} />
                </div>

                <div className="md:w-2/3 mb-20">
                    <h4 className="font-bold text-xl mb-4">Instructor</h4>
                    <div className="flex gap-5 items-center" id="creator">
                        <CustomAvatar name={course.creator?.name} styles="w-[5rem] h-[5rem] text-2xl" />
                        <div className=" max-w-full">
                            <h5 className="flex flex-col gap-2">
                                <h3 className="font-semibold text-primary-theme">
                                    {course.creator?.name}
                                </h3>
                                <p className="text-gray-500 text-sm">
                                    {course.creator?.title
                                        ? (course.creator?.title)
                                        : (course.creator?.email)
                                    }
                                </p>
                            </h5>
                        </div>
                    </div>

                    <div className="text-sm mt-4">
                        {course.creator?.biography?.split('\n').map((line, index) => (
                            <p key={index} className="mb-2 text-wrap">{line}</p>
                        ))}
                        <FormatLineBreaks input={course.creator?.biography} />
                    </div>
                </div>
            </div>
        </div>
    )
}
