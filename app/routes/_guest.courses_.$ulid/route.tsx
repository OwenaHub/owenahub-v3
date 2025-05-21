import { Link, redirect } from "react-router";
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
import { FormatLineBreaks } from "~/components/utility/format-line-break";
import { Button } from "~/components/ui/button";
import EnrollCourse from "./enroll-course";
import SharePage from "~/components/navigation/share-page";
import { BrMd } from "~/components/utility/line-break";

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

            <div className="container flex gap-20 mt-16 md:px-30">
                <section className="md:w-2/3 flex flex-col gap-10">
                    <section className="inline-block">
                        <div className="border border-gray-300 p-3 md:p-6">
                            <h4 className="font-bold text-xl md:text-2xl mb-3">What you'll learn</h4>
                            <div className="text-sm" dangerouslySetInnerHTML={{ __html: course.learningGoals || "" }} />
                        </div>
                    </section>

                    <div className="">
                        <h4 className="font-bold text-xl md:text-2xl mb-4">Other related topics</h4>
                        <div>
                            <Tags args={course.tags} />
                        </div>
                    </div>

                    <div className="">
                        <h4 className="font-bold text-xl md:text-2xl mb-8">What you get in this course</h4>
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

                    <div className="">
                        <h4 className="font-bold text-xl md:text-2xl mb-4">Course content</h4>
                        <div className="text-sm font-light mb-4">
                            {course.modules.length} modules • {" "}
                            {course.modules.reduce((count, module) => count + module.lessons.length, 0)} lessons •
                            5h+ course total length
                        </div>
                        <Accordion type="single" collapsible defaultValue="item-1" className="w-full border">
                            {course.modules.map((module, index) => (
                                <AccordionItem value={`item-${index + 1}`} key={module.id}>
                                    <AccordionTrigger className="px-5 bg-muted font-bold rounded-none">{module.title}</AccordionTrigger>
                                    <AccordionContent className="p-5 flex flex-col gap-4">
                                        {module.lessons.map((lesson: Lesson) => {
                                            const wordsPerMinute = 150; // Average reading speed
                                            const wordCount = lesson.content?.split(' ').length || 0;
                                            const estimatedMinutes = Math.ceil(wordCount / wordsPerMinute);

                                            return (
                                                <div key={lesson.id} className="text-sm my-1 font-light flex items-center justify-between">
                                                    <div className="font-normal flex items-center gap-3">
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

                    <div className="">
                        <h4 className="font-bold text-xl md:text-2xl mb-4">Requirements</h4>
                        <div className="text-sm" dangerouslySetInnerHTML={{ __html: course.requirements || "" }} />
                    </div>

                    <div className="">
                        <h4 className="font-bold text-xl md:text-2xl mb-4">Description</h4>
                        <div className="text-sm" dangerouslySetInnerHTML={{ __html: course.description || "" }} />
                    </div>

                    <div className=" mb-20" id="creator">
                        <h4 className="font-bold text-xl md:text-2xl mb-4">Your Mentor</h4>
                        <div className="flex gap-5 items-center">
                            <CustomAvatar name={course.creator?.name} styles="w-[5rem] h-[5rem] text-2xl" />
                            <div className=" max-w-full">
                                <h5 className="flex flex-col">
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
                            <FormatLineBreaks input={course.creator?.biography} />
                        </div>
                    </div>
                </section>

                {/* Aside info for larger screens */}
                <aside className="hidden md:block w-1.8/3">
                    <div className="border border-b-4 rounded border-primary-theme bg-primary-bg sticky top-28 mb-8 shadow-lg text-xl p-5 flex flex-col gap-2">
                        <h4 className="text-2xl mb-3">
                            {course.price !== "0.00"
                                ? (<section>
                                    <div className='flex gap-2 items-center mb-1'>
                                        <div className='font-extrabold'>
                                            ₦{parseInt(course.price).toLocaleString()}
                                        </div>
                                        <p className="font-light text-gray-500 text-base line-through">₦{(parseInt(course.price) + 12000).toLocaleString()}</p>
                                    </div>
                                    <p className="text-destructive text-sm">
                                        <span className='font-bold uppercase'>Limited offer,</span>{" "}
                                        <span className='font-light'>
                                            expiring soon
                                        </span>
                                    </p>
                                </section>)
                                : <section className="flex items-center gap-4 mb-1">
                                    <span className='text-white p-2 bg-primary-theme rounded font-bold text-sm'>
                                        FREE COURSE
                                    </span>
                                    <p className="text-destructive text-sm leading-4">
                                        <div className='font-bold uppercase'>Limited offer</div>
                                        <div className='font-light'>
                                            Expiring soon
                                        </div>
                                    </p>
                                </section>
                            }
                        </h4>

                        {isEnrolled ? (
                            <div>
                                <Button
                                    disabled
                                    className="w-full py-6 text-sm font-bold uppercase rounded">
                                    Already enrolled
                                </Button>
                                <Link
                                    to={`/my-courses/${course.id}`}
                                    className="mt-3 inline-block text-blue-500 text-center text-xs font-light uppercase w-full hover:underline underline-offset-2">
                                    Go to course
                                </Link>
                            </div>
                        ) : (
                            <EnrollCourse course={course} />
                        )}

                        <div className="flex items-center py-5">
                            <div className="flex-1 border-t border-primary-theme" />
                            <div className="text-gray-500 text-sm font-semibold mx-4">OR</div>
                            <div className="flex-1 border-t border-primary-theme" />
                        </div>

                        <div className="mb-4">
                            <h3 className="font-semibold text-gray-800 mb-2">
                                Subscribe to OwenaHub's top courses
                            </h3>
                            <p className="text-sm font-light">
                                Get this course, plus all of our top-rated courses, <BrMd /> with Personal Plan.
                            </p>
                        </div>

                        <Button className="w-full rounded py-6 text-lg mb-2">
                            Try personal plan today
                        </Button>
                        <div className="text-center text-xs max-w-xl font-light">
                            Starting at ₦2,500 per month after trial  <BrMd />
                            Cancel anytime
                        </div>
                        <div className='my-5 !text-lg'>
                            <SharePage />
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    )
}
