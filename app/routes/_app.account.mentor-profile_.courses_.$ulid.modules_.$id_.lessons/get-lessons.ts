import client from "~/lib/interceptor";

export async function getLessons(ulid: string, id: string) {
    const response = await client.get(`api/mentor/courses/${ulid}/modules/${id}`);
    console.log(response.data);
    
    return response.data
}