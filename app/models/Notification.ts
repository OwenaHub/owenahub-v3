interface Notification extends Model {
    content: string;
    is_read: boolean;
    source: string
    user_id: string;
}