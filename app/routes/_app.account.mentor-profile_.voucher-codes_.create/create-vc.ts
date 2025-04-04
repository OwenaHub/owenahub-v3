import client from "~/lib/interceptor";

export async function createVoucherCode(props: { [k: string]: FormDataEntryValue }) {
    return await client.post('/api/mentor/voucher-codes', {
        issued_to: props.issued_to,
        code: props.code,
        price: props.price,
        expires_at: props.expires_at,
    });
}