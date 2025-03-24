import client from "~/lib/interceptor";

export async function getCreatedCourse(ulid: string) {
    const response = await client.get(`api/mentor/courses/${ulid}`);
    return response.data;
}