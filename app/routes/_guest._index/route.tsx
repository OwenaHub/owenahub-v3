import { ArrowRight, Blocks, Earth, Handshake, Users } from "lucide-react";
import { Link } from "react-router";
import Badge from "~/components/custom/badge";
import Rating from "~/components/custom/rating";
import { Button } from "~/components/ui/button";
import { BrMd } from "~/components/utility/line-break";
import { truncateText } from "~/lib/texts";
import "~/styles/home.css"
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
  {
    title: "Full-Stack Development with MERN",
    price: "35,000",
    discount: "50,000",
    image_path: null,
    rating: 4.8,
    enrollCount: 120,
    description: "Build full-stack applications using MongoDB, Express, React, and Node.js.",
  },
  {
    title: "Python for Data Science",
    price: "20,000",
    discount: "28,000",
    image_path: null,
    rating: 4.7,
    enrollCount: 150,
    description: "Learn Python programming and its application in data analysis and visualization.",
  },
  {
    title: "Cloud Computing with AWS",
    price: "40,000",
    discount: "55,000",
    image_path: null,
    rating: 4.6,
    enrollCount: 90,
    description: "Master AWS services and deploy scalable applications in the cloud.",
  },
  {
    title: "UI/UX Design Fundamentals",
    price: "18,000",
    discount: "25,000",
    image_path: null,
    rating: 4.3,
    enrollCount: 110,
    description: "Learn the principles of user interface and user experience design.",
  },
];

export default function HomePage() {
  return (
    <>
      <header className="py-[4rem] h-[70dvh] bg-primary-theme mb-18 flex flex-col justify-center rounded-b-4xl">
        <section className="container">
          <div className="text-start md:text-center">
            <h1 className="text-4xl text-primary font-extrabold lg:text-7xl mt-3 tracking-tight z-10">
              <span className="">Your code deserves a stage,</span>
              <br className="hidden md:block" />{" "}
              <span className="">Your career deserves a guide.</span>
            </h1>

            <section className="flex flex-col text-gray-800 gap-5 mb-10 mt-5">
              <span className="text-sm md:text-base">
                Create stunning portfolios to showcase your work and access <br className="hidden md:block" />
                expert-led courses to level up your skills
              </span>
            </section>

            <div className="flex flex-col gap-5 justify-center items-center md:flex-row z-10">
              <Link to="/register" className="bg-primary text-center text-primary-foreground border-b-2 border-gray-500 rounded text-sm w-full block font-bold hover:opacity-90 md:inline-block md:w-max px-10 py-2.5 transition">
                Register now!
              </Link>
              <Link
                to="/courses"
                className="rounded text-[#744f00] border-b-2 border-gray-300 text-center text-sm w-full block font-bold bg-white hover:opacity-70 md:inline-block md:w-max outline outline-gray-300 px-10 py-2.5"
              >
                See Courses
              </Link>
            </div>
          </div>
        </section>
      </header>

      <main>
        <div>
          <div className="container mb-8">
            <h2 className="text-2xl md:text-3xl text-gray-800 font-bold mb-2">All tech skills you need all in one palce</h2>
            <p className="text-gray-500 text-sm md:text-base">
              From critical skills to technical topics, Udemy supports your professional development.
            </p>
            <div className="flex flex-nowrap gap-3 items-center overflow-x-auto py-3">
              <Badge
                title="JavaScript"
                description="80+ learners"
              />
              <Badge
                title="Python"
                description="80+ learners"
              />
              <Badge
                title="Algorithms"
                description="80+ learners"
              />
              <Badge
                title="CSS"
                description="80+ learners"
              />
              <Badge
                title="Data science"
                description="80+ learners"
              />
              <Badge
                title="Engineering"
                description="80+ learners"
              />
            </div>
          </div>

          <section className="bg-gray-50">
            <div className="mx-auto py-10 sm:pb-16 container">
              <div className="flex flex-row items-stretch flex-nowrap gap-3 overflow-x-auto snap-x snap-proximity mb-5 pb-3">
                {tracks.map((track, index) => (
                  <div key={index} className="snap-center flex min-w-80 h-80 flex-col border border-gray-200 bg-white p-2 rounded-lg group hover:border-b relative transition">
                    {/* Course Image */}
                    <div className="bg-slate-100 rounded-lg w-full aspect-video group-hover:opacity-75 lg:aspect-auto lg:h-36 overflow-hidden">
                      <img
                        src={track.image_path
                          ? `${track.image_path}`
                          : "/images/banners/default-course-img.png"}
                        alt={track.title}
                        className="h-full rounded w-full object-cover"
                      />
                    </div>

                    {/* Content Wrapper */}
                    <div className="flex flex-col flex-grow justify-between mt-2">
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

              <Button variant={'outline'} className="px-6 border-primary-theme hover:bg-white rounded bg-primary-bg flex items-center gap-2">
                <span>See all courses</span> <ArrowRight size={18} />
              </Button>
            </div>
          </section>

          <div className="pb-20 pt-16 container">
            <div>
              <h2 className="font-bold pb-7 text-4xl md:text-6xl md:text-center text-gray-800">
                Mentorship that <BrMd />
                <span className="text-primary-theme">shapes your future</span>.
              </h2>
            </div>

            <div className="flex md:flex-row flex-col gap-5 items-stretch my-7">
              <div className="flex basis-1/3 rounded-xl p-5 flex-col gap-9 bg-primary-theme hover:shadow-xl transition">
                <div className="bg-primary-bg rounded-lg p-2 text-primary-theme inline-block w-max">
                  <Users className="w-10 h-10" strokeWidth={1} />
                </div>
                <h4 className="text-2xl font-medium">
                  200k+ users enjoy and use our <BrMd /> top products
                </h4>
                <div className="flex-grow-1"></div>
                <Link to={"/"} className="underline underline-offset-2">
                  Join us
                </Link>
              </div>

              <div className="flex basis-2/3 rounded-xl p-5 flex-col gap-9 bg-primary-bg border border-primary-theme hover:shadow-xl transition">
                <div className="bg-primary-theme rounded-lg p-2 text-white inline-block w-max">
                  <Earth className="w-10 h-10" strokeWidth={1}/>
                </div>
                <h4 className="text-2xl font-medium">
                  Helping connecting businesses <BrMd /> in all 36 states of Nigeria.
                </h4>
                <p className="font-light">
                  Keeping teams productive and connected, <BrMd />
                  no matter where collaboration happens
                </p>
                <div className="flex-grow-1"></div>
                <Link to={"/"} className="underline underline-offset-2">
                  Join us
                </Link>
              </div>
            </div>

          </div>

          <div className="mx-auto pt-10 sm:pb-16 container">
            <div className="grid grid-cols-1 gap-x-4 gap-y-6 lg:grid-cols-4 sm:grid-cols-2 xl:gap-x-6 mb-5">
              {tracks.map((track, index) => (
                <div key={index} className="flex flex-col border border-gray-200 bg-white h-full p-2 rounded-lg group hover:border-b relative transition">
                  {/* Course Image */}
                  <div className="bg-slate-100 rounded-lg w-full aspect-video group-hover:opacity-75 lg:aspect-auto lg:h-36 overflow-hidden">
                    <img
                      src={track.image_path
                        ? `${track.image_path}`
                        : "/images/banners/default-course-img.png"}
                      alt={track.title}
                      className="h-full rounded w-full object-cover"
                    />
                  </div>

                  {/* Content Wrapper */}
                  <div className="flex flex-col flex-grow justify-between mt-2">
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

            <Button variant={'outline'} className="px-6">
              See all courses
            </Button>
          </div>
        </div>
      </main>
    </>
  )
}