import client from "~/lib/interceptor";

export async function getNotifications() {
    const response = await client.get('api/notifications');
    return response.data.notifications;
}