interface VoucherCode extends Model {
    mentor_profile_id: number;
    issuedTo: string;
    code: string;
    price: string; // Keeping as string since it's formatted as "10000.00"
    status: "redeemed" | "unused" | "expired"; // Assuming possible statuses
    expiresAt: string | null;
}
