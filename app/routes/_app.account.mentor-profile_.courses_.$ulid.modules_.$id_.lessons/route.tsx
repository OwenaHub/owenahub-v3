import { Link } from "react-router";
import type { Route } from "../_app.account.mentor-profile_.courses_.$ulid.modules_.$id_.lessons/+types/route";
import { getLessons } from "./get-lessons";
import LessonCard from "./lesson-card";
import { Plus } from "lucide-react";

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  if (!params.id) throw new Error("Invalid request");
  const module = await getLessons(params.ulid, params.id);
  console.log(module.lessons)
  return {
    module: module,
    lessons: module.lessons,
  }
}

export default function route({ loaderData }: Route.ComponentProps) {
  let { module, lessons } = loaderData;

  return (
    <div className="pb-4 mt-10">
      <div className="mb-8">
        <h4 className="font-semibold text-xl">
          Module {Math.abs(module.position)}
        </h4>
        <p className="text-lg font-light">
          {module.title}
        </p>
      </div>

      <div>
        {lessons.length
          ? lessons.map((lesson: any) => (
            <div className="flex flex-col mb-5">
              <LessonCard lesson={lesson} />
            </div>
          ))
          : <p className="text-gray-400 text-sm w-max rounded pb-3">
            Nothing here yet, <Link to={"create"} className="text-blue-700 hover:underline">add lesson</Link>
          </p>
        }

        {lessons.length > 0 && (
          <div className="border border-gray-200 border-b-2 py-2 rounded-md hover:bg-gray-50">
            <Link to={"create"} className="flex justify-center items-center gap-2 text-sm uppercase ">
              <span>Add lesson</span>
              <Plus size={18} />
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
