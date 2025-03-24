import client from "~/lib/interceptor";

export async function createCourseModule(props: { [k: string]: FormDataEntryValue }) {
    return client.post(`api/mentor/courses/${props.course_id}/modules`, {
        title: props.title,
        description: props.description,
        position: props.position,
    });
}