import client from "~/lib/interceptor";

export async function getVoucherCodes() {
    const response = await client.get('api/mentor/voucher-codes');
    return response.data.voucherCodes;
}