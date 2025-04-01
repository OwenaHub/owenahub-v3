import { Blocks, ClockArrowUp, Earth, Handshake, Settings, Users } from "lucide-react";
import { Link } from "react-router";
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
]

export default function HomePage() {
  return (
    <>
      <header className="py-[4rem] h-[60dvh] flex flex-col justify-center">
        <section className="container">
          <div className="text-start md:text-center">
            <h1 className="text-4xl text-primary-theme font-extrabold lg:text-5xl mt-3 tracking-tight z-10">
              <span className="text-primary-theme">Your code deserves a stage,</span>
              <br className="hidden md:block" />{" "}
              <span className="text-gray-800">Your career deserves a guide.</span>
            </h1>

            <section className="flex flex-col text-muted-foreground gap-5 mb-10 mt-5">
              <span className="text-sm md:text-base">
                Create stunning portfolios to showcase your work and access <br className="hidden md:block" />
                expert-led courses to level up your skills
              </span>
            </section>

            <div className="flex flex-col gap-5 justify-center items-center md:flex-row z-10">
              <Link to="/register" className="bg-primary-theme rounded-lg border-b-4 border-[#744f00] shadow text-center text-sm w-full block font-bold hover:opacity-50 md:inline-block md:w-max px-10 py-2.5 transition">
                Register now!
              </Link>
              <Link
                to="/courses"
                className=" rounded-lg text-[#744f00] border-b-4 border-gray-300 text-center text-sm w-full block font-bold hover:bg-gray-100 md:inline-block md:w-max outline outline-gray-300 px-10 py-2.5"
              >
                See Courses
              </Link>
            </div>
          </div>
        </section>
      </header>

      <main>
        <div className="flex md:flex-row flex-col items-center justify-between gap-10 mb-20 container">
          <div>
            <h2 className="text-4xl font-semibold pb-5 text-gray-800">
              Our Mission<span className="text-primary-theme font-black text-5xl animate-bounce inline-block">.</span>
            </h2>
            <p className="text-base text-gray-700">
              To provide innovative and strategic IT services aimed at availing our clients with total IT solutions to enable them achieve their business
              objectives and gain a competitive edge in today’s business environment.
            </p>
          </div>

          <div className="flex md:flex-row flex-col items-stretch gap-3">
            <div className="rounded-lg py-12 px-5 border border-gray-200 relative overflow-hidden">
              <div className="absolute -top-10 right-0 opacity-30 bg-gray-100">
                <Blocks className="h-36 w-36 text-primary-theme" strokeWidth={1} />
              </div>
              <h3 className="font-bold pb-3 text-gray-800">What we build</h3>
              <p className="text-gray-700">
                A suite of applications designed with usability goals in mind that focus on business process automation.
              </p>
            </div>
            <div className="rounded-lg py-12 px-5 border border-gray-200 relative overflow-hidden">
              <div className="absolute -top-10 right-0 opacity-30">
                <Handshake className="h-36 w-36 text-primary-theme" strokeWidth={1} />
              </div>
              <h3 className="font-bold pb-3 text-gray-800">What we do</h3>
              <p className="text-gray-700">
                Our service offerings range from consultancy to software development / customization and biometric verification.
              </p>
            </div>
          </div>
        </div>

        <div>
          <div className="container mb-8">
            <h2 className="text-2xl md:text-3xl text-gray-800 font-bold mb-2">All tech skills you need all in one palce</h2>
            <p className="text-gray-500 text-sm md:text-base">
              From critical skills to technical topics, Udemy supports your professional development.
            </p>
          </div>

          <section className="bg-gray-50">
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
          </section>

          <div className="pb-20 pt-10 container">
            <div>
              <h2 className="font-bold pb-7 text-5xl md:text-center text-gray-800">
                We create products that <BrMd />
                <span className="text-primary-theme">shape our future</span>.
              </h2>
            </div>

            <div className="flex md:flex-row flex-col gap-5 items-stretch my-7">
              <div className="flex basis-1/3 rounded-xl p-5 flex-col gap-9 bg-secondary">
                <div className="bg-primary-theme rounded-xl p-3 text-white inline-block w-max">
                  <Users className="w-8 h-8 fill-white" />
                </div>
                <h4 className="text-2xl font-medium">
                  200k+ users enjoy and use our <BrMd /> top products
                </h4>
                <div className="flex-grow-1"></div>
                <Link to={"/"} className="underline underline-offset-2">
                  Join us
                </Link>
              </div>

              <div className="flex basis-2/3 rounded-xl p-5 flex-col gap-9 bg-primary-theme">
                <div className="bg-white rounded-xl p-3 text-primary-theme inline-block w-max">
                  <Earth className="w-8 h-8" />
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