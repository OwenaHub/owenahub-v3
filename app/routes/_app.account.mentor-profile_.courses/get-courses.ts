import client from "~/lib/interceptor";

export async function getCreatedCourses() {
    const response = await client.get(`api/mentor/courses`);
    return response.data.courses;
}