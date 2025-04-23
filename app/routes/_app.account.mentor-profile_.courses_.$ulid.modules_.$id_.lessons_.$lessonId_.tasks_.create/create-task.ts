import client from "~/lib/interceptor";

export async function createTask(props: { [k: string]: FormDataEntryValue }) {
     const formData = new FormData();

    for (const key in props) {
        formData.append(key, props[key]);
    }

    if (props.thumbnail instanceof File)
        formData.append("thumbnail", props.thumbnail);

    const response = await client.post(`api/mentor/lessons/${props.lessonId}/tasks`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });

    return response;
}