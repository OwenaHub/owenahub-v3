interface User extends Model {
    name: string;
    email: string;
    phone: string;
    profile_picture_url: string;
    email_verified_at: string;
    account_type: 'admin' | 'vendor' | 'user';
}