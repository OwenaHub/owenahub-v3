import { Search } from "lucide-react";
import { posts } from "~/content";
import PostCard from "./post-card";

export default function Blog() {
    return (
        <div className="py-[4rem] mt-8">
            <div className="container mb-8">
                <h1 className="text-2xl md:text-3xl mb-2">
                    <span className="font-light">OwenaHub</span> <span className="font-bold">Blog</span>
                </h1>
                <p className="text-gray-500 text-sm md:text-base mb-4">
                    Our latest news
                </p>

                <div className="flex gap-3 flex-col md:flex-row md:items-center justify-between mb-10">
                    <div className="w-full shadow md:w-max flex items-center p-1 ps-5 rounded-full outline focus-within:outline group focus-within:outline-primary-theme">
                        <input
                            type="search"
                            className="py-2 w-full md:w-max outline-none"
                            placeholder="Search blog posts"
                        />
                        <div className="text-gray-500 bg-primary-bg group-focus-within:text-primary-theme h-full p-2 rounded-full">
                            <Search strokeWidth={1.3} size={27} />
                        </div>
                    </div>
                </div>

                {/* Blog Cards Grid */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {posts.map((post: any, idx: number) => (
                        <>
                            <PostCard
                                key={idx}
                                title={post.meta.title}
                                image={post.meta.image}
                                date={post.meta.date}
                                slug={post.meta.slug}
                            />
                        </>
                    ))}
                </div>
            </div>
        </div>

    )
}
