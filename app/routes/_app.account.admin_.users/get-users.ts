import client from "~/lib/interceptor";

export async function getUsers() {
    const response = await client.get('api/admin/users');
    console.log(response);

    return response.data
}