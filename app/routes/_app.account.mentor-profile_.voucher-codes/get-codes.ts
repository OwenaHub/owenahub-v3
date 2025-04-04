import client from "~/lib/interceptor";

export async function getVoucherCodes() {
    const response = await client.get('api/mentor/voucher-codes');
    console.log(response.data.voucherCodes)
    return response.data.voucherCodes;
}