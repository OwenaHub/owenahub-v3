interface Lesson extends Model {
    moduleId: number;
    title: string;
    position: number;
    content: string;
    videoUrl: string;
    completed?: boolean
}