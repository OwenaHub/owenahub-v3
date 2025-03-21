interface User extends Model {
    name: string;
    username: string;
    email: string;
    profilePicture: string;
    title: string;
    biography: string;
    accountType: 'admin' | 'vendor' | 'user';
    emailVerifiedAt: string;
}