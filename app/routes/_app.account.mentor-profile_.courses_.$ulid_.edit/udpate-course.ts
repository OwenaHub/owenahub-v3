import client from "~/lib/interceptor";

export async function updateCourse(props: { [k: string]: FormDataEntryValue }) {
    const formData = new FormData();
    formData.append("_method", "PATCH")

    for (const key in props) {
        formData.append(key, props[key]);
    }

    if (props.thumbnail instanceof File)
        formData.append("thumbnail", props.thumbnail);

    const response = await client.post(`api/mentor/courses/${props.courseId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });

    return response;
}

export async function getCourse(courseId: string) {
    const response = await client.get(`api/mentor/courses/${courseId}`);
    return response.data
}