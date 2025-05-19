import client from "~/lib/interceptor";

export async function getLesson(ulid: string, moduleId: string, lessonId: string) {
    const response = await client.get(`api/user/enrollment/courses/${ulid}/modules/${moduleId}/lessons/${lessonId}`);    
    return response.data;
}

export async function markDone(props: { [k: string]: FormDataEntryValue }) {
    return client.post(`api/user/enrollment/user-course/${props.lessonId}`, {
        completed: props.completed,
    });
}