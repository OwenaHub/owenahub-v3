import client from "~/lib/interceptor";

export async function updateAccount(props: { [k: string]: FormDataEntryValue }) {
    const formData = new FormData();
    formData.append("_method", "PATCH")

    for (const key in props) {
        formData.append(key, props[key]);
    }

    const response = await client.post(`api/user/account`, formData);
    return response
}