interface Notification extends Model {
    content: string;
    isRead: boolean;
    source: string;
}