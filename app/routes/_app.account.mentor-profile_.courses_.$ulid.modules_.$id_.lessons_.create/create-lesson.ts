import client from "~/lib/interceptor";

export async function createLesson(props: { [k: string]: FormDataEntryValue }) {
    return client.post(`api/mentor/courses/${props.courseId}/modules/${props.moduleId}/lessons`, {
        title: props.title,
        position: props.position,
        content: props.content,
        video_url: props.video_url,
    });
}