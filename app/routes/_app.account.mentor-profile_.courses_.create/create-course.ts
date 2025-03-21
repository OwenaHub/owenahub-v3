import client from "~/lib/interceptor";

export async function createCourse(props: { [k: string]: FormDataEntryValue }) {
    const formData = new FormData();

    for (const key in props) {
        formData.append(key, props[key]);
    }

    if (props.thumbnail instanceof File)
        formData.append("thumbnail", props.thumbnail);

    const response = await client.post(`api/mentor/courses`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });

    return response;
}