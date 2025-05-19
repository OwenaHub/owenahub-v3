import client from "~/lib/interceptor";

export async function sendEmailRequest(props: { [k: string]: FormDataEntryValue }) {
    return client.post(`api/forgot-password`, {
        email: props.email,
    });
}