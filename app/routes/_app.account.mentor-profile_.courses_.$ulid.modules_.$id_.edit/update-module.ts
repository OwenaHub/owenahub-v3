import client from "~/lib/interceptor";

export async function updateModule(props: { [k: string]: FormDataEntryValue }) {
    return client.patch(`api/mentor/courses/${props.courseId}/modules/${props.moduleId}`, {
        title: props.title,
        description: props.description,
        position: Math.abs(parseInt(props.position as string)),
    });
}

export async function getModule(courseId: string, moduleId: string) {
    const response = await client.get(`api/mentor/courses/${courseId}/modules/${moduleId}`)
    return response.data;
}