import client from "~/lib/interceptor";

export async function updateTask(props: { [k: string]: FormDataEntryValue }) {
    const formData = new FormData();
    formData.append("_method", "PATCH");

    for (const key in props) {
        formData.append(key, props[key]);
    }

    if (props.thumbnail instanceof File)
        formData.append("thumbnail", props.thumbnail);

    const response = await client.post(`api/mentor/lessons/${props.lessonId}/tasks`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
}

export async function getTask(taskId: string) {
    const response = await client.get(`api/mentor/tasks/${taskId}`);
    return response.data;
}