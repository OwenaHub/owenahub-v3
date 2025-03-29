interface Module extends Model {
    courseId: string,
    title: string,
    description: string,
    lessons: Lesson[],
    position: number,
}