import type { Route } from "../_app.account.mentor-profile_.courses_.$ulid.modules_.$id_.lessons/+types/route";
import { getLessons } from "./get-lessons";

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  if (!params.id) throw new Error("Invalid request");
  const lessons = await getLessons(params.ulid, params.id)
}

export default function route() {
  return (
    <div>
      Route
    </div>
  )
}
