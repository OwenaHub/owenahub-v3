import client from "~/lib/interceptor";

export async function resetPassword(props: { [k: string]: FormDataEntryValue }) {
    return client.post(`api/reset-password`, {
        token: props.token,
        email: props.email,
        password: props.password,
        password_confirmation: props.confirm_password,
    });
}