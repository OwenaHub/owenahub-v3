interface Course extends Model {
    title: string;
    about: string;
    tags: string;
    creator?: User;
    thumbnail: string | null;
    learningGoals: string | null;
    requirements: string | null;
    description: string;
    startDate: Date;
    modules: Module[];
    price: string;
    status?: "draft" | "published" | "archived";
}
