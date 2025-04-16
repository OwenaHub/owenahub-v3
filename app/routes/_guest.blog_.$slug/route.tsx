import { useMemo } from "react";
import { useParams } from "react-router";
import NavigateBack from "~/components/navigation/navigate-back";
import { posts } from "~/content";

export default function BlogPage() {
    const { slug } = useParams();
    const Post = useMemo(() => posts.find(p => p.meta.slug === slug), [slug]);

    if (!Post) {
        return <div className="p-12 text-red-500 text-xl">Post not found</div>;
    }

    return (
        <article className="container py-12 mt-[50rem]" id="html-content">
            <div className="mb-8">
                <NavigateBack />
            </div>

            <Post.default />
        </article>
    );
}
