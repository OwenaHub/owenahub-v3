import client from "~/lib/interceptor";

export async function getCourse(ulid: string) {
    const response = await client.get(`api/user/enrollment/courses/${ulid}`);
    return response.data;
}