import Cookies from "js-cookie";
import { storageKeys } from "./keys";

export function storeLessonActivity({ path, module, lesson }:
    { path: string; module: Module; lesson: Lesson }): void {
    const cookieData = JSON.stringify({
        link: path,
        lessonTitle: lesson.title,
        lessonPosition: lesson.position,
        modulePosition: module.position,
    });
    // console.log(cookieData);

    Cookies.set(storageKeys.lessonActivity, cookieData);
};

export async function getLessonActivity(): Promise<LessonActivity | null> {
    const data = Cookies.get(storageKeys.lessonActivity);

    const activity = data
        ? JSON.parse(data)
        : null;

    return activity;
}