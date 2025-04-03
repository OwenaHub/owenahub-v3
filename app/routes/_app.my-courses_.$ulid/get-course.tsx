import client from "~/lib/interceptor";

export async function getCourse(ulid: string) {
    const response = await client.get(`api/user/enrollment/courses/${ulid}`);
    console.log(response)
    return response.data;
}