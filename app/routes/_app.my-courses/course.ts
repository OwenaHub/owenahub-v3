import client from "~/lib/interceptor";

export async function getEnrolledCourses() {
    const response = await client.get(`api/user/enrollment/courses`);   
    return response.data.courses;
}