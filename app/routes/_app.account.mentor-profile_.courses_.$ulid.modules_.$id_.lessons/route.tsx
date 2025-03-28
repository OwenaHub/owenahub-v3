import { Link } from "react-router";
import type { Route } from "../_app.account.mentor-profile_.courses_.$ulid.modules_.$id_.lessons/+types/route";
import { getLessons } from "./get-lessons";
import LessonCard from "./lesson-card";

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  if (!params.id) throw new Error("Invalid request");
  const module = await getLessons(params.ulid, params.id);
  return {
    module: module,
    lessons: module.lessons,
  }
}

export default function route({ loaderData }: Route.ComponentProps) {
  let { module, lessons } = loaderData;

  return (
    <div className="pb-4 mt-10">
      <div className="mb-10">
        <h4 className="font-semibold text-xl">
          Module {module.position}
        </h4>
        <p className="text-lg font-light">
          {module.title}
        </p>
      </div>

      <div>
        {lessons.length
          ? lessons.map((lesson: any) => (
            <div className="flex flex-col gap-3">
              <LessonCard lesson={lesson} />
            </div>
          ))
          : <p className="text-gray-400 text-sm w-max rounded pb-3">
            Nothing here yet, <Link to={"create"} className="text-blue-700 hover:underline">add lesson</Link>
          </p>
        }
      </div>
    </div>
  )
}
