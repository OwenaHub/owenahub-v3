import client from "~/lib/interceptor";

export async function updateLesson(props: { [k: string]: FormDataEntryValue }) {
    return client.patch(`api/mentor/courses/${props.courseId}/modules/${props.moduleId}/lessons/${props.lessonId}`, {
        title: props.title,
        position: Math.abs(parseInt(props.position as string)),
        content: props.content,
        video_url: props.video_url,
    });
}

export async function getLesson(courseId: string, moduleId: string, lessonId: string) {
    const response = await client.get(`api/mentor/courses/${courseId}/modules/${moduleId}/lessons/${lessonId}`);
    return response.data
}