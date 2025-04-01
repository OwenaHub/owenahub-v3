import { Search } from "lucide-react"
import { Link } from "react-router"
import Badge from "~/components/custom/badge"
import Rating from "~/components/custom/rating"
import { Input } from "~/components/ui/input"
import { truncateText } from "~/lib/texts"

const tracks = [
    {
        title: "Web development: HTML, CSS and JavaScript",
        price: "9,999",
        discount: "15,999",
        image_path: "/images/banners/html-course-banner.png",
        rating: 4.5,
        enrollCount: 103,
        description: "Learn the basics of web development with HTML, CSS and JavaScript.",
    },
    {
        title: "Web development: JavaScript Mastery",
        price: "14,500",
        discount: "24,000",
        image_path: "/images/banners/js-beginners-banner.png",
        rating: 5,
        enrollCount: 98,
        description: "JavaScript core topics: TypeScript, Object-Oriented Programming, Maps, Promises",
    },
    {
        title: "Web Development: Javascript Frameworks/Libraries",
        price: "23,500",
        discount: "30,000",
        image_path: null,
        rating: 4,
        enrollCount: 58,
        description: "Mastering popular JavaScript frameworks and libraries like React, Vue, and Angular.",
    },
    {
        title: "Algorithms and Data Structures",
        price: "30,500",
        discount: "40,000",
        image_path: null,
        rating: 3,
        enrollCount: 83,
        description: "Learn sorting, searching, dynamic programming, and more with real-world examples",
    },
]

export default function Courses() {
    return (
        <div className="py-[4rem] mt-15">
            <div className="container mb-8">
                <h2 className="text-2xl md:text-3xl text-gray-800 font-bold mb-2">Courses</h2>
                <p className="text-gray-500 text-sm md:text-base mb-4">
                    From critical skills to technical topics, OwenaHub supports your professional development.
                </p>

                <div className="flex gap-3 flex-col md:flex-row md:items-center justify-between">
                    <div className="w-full md:w-max flex items-center px-3 rounded-sm outline shadow focus-within:outline group focus-within:outline-primary-theme">
                        <input
                            type="search"
                            className="py-2 w-full md:w-max  outline-none"
                            placeholder="Search courses"
                        />
                        <Search
                            strokeWidth={1.3}
                            size={27}
                            className="text-gray-500 group-focus-within:text-primary-theme"
                        />
                    </div>

                    <div className="flex flex-nowrap gap-1 items-center overflow-x-auto">
                        <Badge title="JavaScript" />
                        <Badge title="Python" />
                        <Badge title="Algorithms" />
                        <Badge title="CSS" />
                        <Badge title="Data science" />
                        <Badge title="Engineering" />
                    </div>
                </div>
            </div>

            <section className="container">
                <div className="grid grid-cols-1 gap-x-4 gap-y-6 lg:grid-cols-4 sm:grid-cols-2 xl:gap-x-6 mb-5">
                    {tracks.map((track, index) => (
                        <div key={index} className="grid grid-cols-4 shadow gap-2  border-t bg-white h-full p-2 rounded-lg group hover:border-b relative transition">
                            <div className="bg-slate-100 border md:border-0 col-span-1 md:col-span-4 md:rounded-lg w-full aspect-square group-hover:opacity-75 lg:aspect-auto lg:h-44 overflow-hidden">
                                <img
                                    src={track.image_path
                                        ? `${track.image_path}`
                                        : "/images/banners/default-course-img.png"}
                                    alt={track.title}
                                    className="h-full rounded w-full object-cover"
                                />
                            </div>

                            {/* Content Wrapper */}
                            <div className="flex flex-col col-span-3 flex-grow justify-between md:mt-2">
                                {/* Title & Description */}
                                <div className="flex flex-col gap-1.5 mb-1.5">
                                    <div className="flex items-center">
                                        <h3 className="text-gray-600 font-bold leading-5">
                                            <span className="leading-[-5px]">{track.title}</span>
                                            <Link to="/courses">
                                                <span aria-hidden="true" className="absolute inset-0" />
                                            </Link>
                                        </h3>
                                    </div>
                                    <div className="text-xs font-light">
                                        {truncateText(track.description, 100)}
                                    </div>
                                </div>

                                {/* Rating & Price - Pushed to the bottom */}
                                <div className="mt-auto">
                                    <div className="flex gap-2 items-center">
                                        <p className="text-yellow-800 font-extrabold">4.5</p>
                                        <div className="flex gap-1">
                                            <Rating rating={track.rating} />
                                        </div>
                                        <p>({track.enrollCount})</p>
                                    </div>
                                    <div className="flex gap-2 items-center">
                                        <p className="font-bold">₦{track.price}</p>
                                        <p className="font-light line-through">₦{track.discount}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    )
}
