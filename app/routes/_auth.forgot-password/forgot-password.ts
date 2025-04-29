import client from "~/lib/interceptor";

export async function sendEmailRequest(props: { [k: string]: FormDataEntryValue }) {
    // await client.get('sanctum/csrf-cookie');

    return client.post(`api/forgot-password`, {
        email: props.email,
    });
}