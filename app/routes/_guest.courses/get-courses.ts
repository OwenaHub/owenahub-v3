import client from "~/lib/interceptor";

export async function getCourses() {
    const response = await client.get("api/user/courses");
    return response.data.courses;
}