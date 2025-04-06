import { Search } from "lucide-react";
import { Link } from "react-router";

import * as Post1 from "~/content/posts/laravel-react-combo.mdx";
import * as Post2 from "~/content/posts/highly-effective-devs.mdx";

const posts = [Post1, Post2];

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
                <div className="grid gap-6 md:grid-cols-2  lg:grid-cols-4">
                    {posts.map((post: any, idx: number) => (
                        <div
                            key={idx}
                            className="bg-white relative rounded shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden flex flex-col"
                        >
                            <img
                                src={post.meta.image}
                                alt={post.meta.title}
                                className="w-full max-h-48 aspect-video object-cover"
                            />
                            <div className="p-4 flex flex-col flex-1">
                                <h3 className="text-lg font-semibold text-gray-800 mb-1">
                                    {post.meta.title}
                                </h3>
                                <p className="text-sm text-gray-500 mb-3 flex-1">{post.meta.excerpt}</p>
                                <span className="text-xs text-gray-400 mt-auto">{post.meta.date}</span>
                            </div>
                            <Link
                                to={`/blog/${post.meta.slug}`}
                                aria-hidden="true"
                                className="absolute inset-0"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>

    )
}
