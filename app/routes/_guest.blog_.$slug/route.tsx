import { useMemo } from "react";
import { useParams } from "react-router";

import * as Post1 from "~/content/posts/laravel-react-combo.mdx";
import * as Post2 from "~/content/posts/highly-effective-devs.mdx";

const posts = [Post1, Post2];

export default function BlogPage() {
    const { slug } = useParams();
    const Post = useMemo(() => posts.find(p => p.meta.slug === slug), [slug]);

    if (!Post) {
        return <div className="p-12 text-red-500 text-xl">Post not found</div>;
    }

    return (
        <article className="container py-12 mt-[50rem]" id="html-content">
            <Post.default />
        </article>
    );
}
