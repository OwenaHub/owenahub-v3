import { ArrowRight, Earth, MonitorSmartphone, Quote, Shapes, Trophy, TvMinimalPlay, Users } from "lucide-react";
import { Link } from "react-router";
import Badge from "~/components/custom/badge";
import CustomAvatar from "~/components/custom/custom-avatar";
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

const reviews = [
  {
    username: "Jide Adebayo",
    comment: "Thank you OwenaHub, this has been super helpful",
    career: "Software Engineer"
  },
  {
    username: "Amaka Johnson",
    comment: "The courses are well-structured and easy to follow. Highly recommended!",
    career: "Medical Personel"
  },
  {
    username: "Tunde Adebayo",
    comment: "I gained so much confidence in my coding skills after taking these courses.",
    career: "Full-Stack Developer"
  },
  {
    username: "Fatima Yusuf",
    comment: "The mentorship program is top-notch. It really helped me land my first tech job.",
    career: "Data Analyst"
  },
  {
    username: "Chinedu Okafor",
    comment: "Great platform for learning and growing in the tech industry. Keep it up!",
    career: "Cloud Engineer"
  }
];


export default function HomePage() {
  return (
    <>
      <header className="py-[4rem] h-[70dvh] border-b-2 border-gray-200 bg-primary-bg mb-18 flex flex-col justify-center rounded-b-[50px] relative overflow-hidden">
        <section className="container">
          <div className="text-start md:text-center">
            <h1 className="text-4xl text-primary capitalize font-extrabold font-serif lg:text-7xl mt-3 tracking-[-2px] z-10">
              <span className="text-[#315E8B]">Build your career with </span>
              <br className="hidden md:block" />{" "}
              <span className="text-primary-theme">expert mentors</span>
            </h1>

            <section className="flex flex-col text-gray-800 gap-5 mb-10 mt-8">
              <span className="text-sm md:text-base">
                We offer comprehensive courses and dedicated <BrMd />
                mentorship to ensure you never get stuck.
              </span>
            </section>

            <div className="flex flex-col gap-5 justify-center items-center md:flex-row z-10">
              <Link
                to="/register"
                className="bg-primary-theme text-center text-primary-foreground border-b-2 border-amber-900 focus:border-b-0 focus:top-[2px] rounded text-base w-full block font-medium hover:opacity-90 md:inline-block md:w-max px-10 py-2.5 relative transition">
                Register for free!
              </Link>
              <Link
                to="/courses"
                className="z-10 rounded text-[#744f00] border-b-2 border-gray-300 focus:border-b-0 relative focus:top-[2px] text-center text-base w-full block font-medium bg-white hover:opacity-70 md:inline-block md:w-max outline outline-gray-300 px-10 py-2.5"
              >
                Courses
              </Link>
            </div>
          </div>
        </section>
        <div className="absolute -bottom-40 md:-bottom-35 left-50 rotate-[20deg] rounded-2xl h-70 w-70 md:w-90 md:h-90 border border-[#315E8B] bg-[#c9d0d7] opacity-45 md:opacity-85" />
      </header>

      <main>
        <div className="container mb-8">
          <h2 className="text-2xl md:text-3xl text-gray-800 font-bold mb-2 font-serif tracking-tighter">All tech skills you need all in one place</h2>
          <p className="text-gray-500 text-sm md:text-base">
            We offer courses on technical topics, OwenaHub supports your professional tech development.
          </p>
          <div className="flex flex-nowrap gap-3 items-center overflow-x-auto py-3">
            <Badge
              title="JavaScript"
              description="80+ learners"
            />
            <Badge
              title="Python"
              description="20+ learners"
            />
            <Badge
              title="Algorithms"
              description="30+ learners"
            />
            <Badge
              title="CSS"
              description="120+ learners"
            />
            <Badge
              title="Data science"
              description="10+ learners"
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
                <div key={index} className="snap-center flex min-w-80 h-84 flex-col border border-gray-200 bg-white rounded-lg group hover:border-b relative transition">
                  {/* Course Image */}
                  <div className="bg-slate-100 rounded-t-lg w-full aspect-video group-hover:opacity-75 lg:aspect-auto lg:h-40 overflow-hidden">
                    <img
                      src={track.image_path
                        ? `${track.image_path}`
                        : "/images/banners/default-course-img.png"}
                      alt={track.title}
                      className="h-full rounded w-full object-cover"
                    />
                  </div>

                  {/* Content Wrapper */}
                  <div className="flex flex-col flex-grow justify-between px-4 py-2">
                    {/* Title & Description */}
                    <div className="flex flex-col gap-1.5 mb-1.5">
                      <div className="flex items-center">
                        <h3 className="text-primary font-bold leading-5 mb-1">
                          <span className="leading-[-5px]">{track.title}</span>
                          <Link to="/courses">
                            <span aria-hidden="true" className="absolute inset-0" />
                          </Link>
                        </h3>
                      </div>
                      <div className="text-[13px] text-gray-500 font-">
                        {truncateText(track.description, 80)}
                      </div>
                    </div>

                    {/* Rating & Price - Pushed to the bottom */}
                    <div className="mt-auto">
                      <div className="flex gap-2 items-center text-xs mb-2">
                        <p className="text-yellow-800 font-extrabold">4.5</p>
                        <div className="flex gap-1">
                          <Rating rating={track.rating} />
                        </div>
                        <p className="text-gray-400">({track.enrollCount})</p>
                      </div>
                      <div className="flex gap-2 items-center">
                        <p className="font-bold">₦{track.price}</p>
                        <p className="font-light text-gray-500 line-through">₦{track.discount}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <Link to="/courses">
              <Button variant={'outline'} className="px-6 border-primary-theme hover:bg-white rounded bg-primary-bg flex items-center gap-2">
                <span>See all courses</span> <ArrowRight size={18} />
              </Button>
            </Link>
          </div>
        </section>

        <div className="pb-20 pt-16 container">
          <div>
            <h2 className="font-bold font-serif tracking-tighter pb-7 text-4xl md:text-6xl md:text-center text-gray-800">
              Mentorship that <BrMd />
              <span className="text-primary-theme">shapes your future</span>.
            </h2>
          </div>

          <div className="flex md:flex-row flex-col gap-5 items-stretch my-7">
            <div className="flex basis-1/3 rounded-xl p-5 flex-col gap-9 bg-primary-theme shadow-lg transition relative overflow-hidden">
              <div className="bg-primary-bg rounded-lg p-2 text-primary-theme inline-block w-max">
                <Users className="w-10 h-10" strokeWidth={1} />
              </div>
              <h4 className="text-2xl font-medium z-10">
                2k+ students enjoy and use <BrMd /> OwenaHub
              </h4>
              <div className="flex-grow-1"></div>
              <Link to={"/register"} className="underline underline-offset-2 z-10">
                Join us
              </Link>
              <Shapes
                strokeWidth={0.5}
                className="absolute -bottom-40 md:-bottom-30 right-10 rounded-2xl h-96 w-96 text-primary-bg opacity-45 md:opacity-60"
              />
            </div>

            <div className="flex basis-2/3 rounded-xl p-5 flex-col gap-9 bg-primary-bg  shadow-md transition relative overflow-hidden">
              <div className="bg-primary-theme rounded-lg p-2 text-white inline-block w-max">
                <Earth className="w-10 h-10" strokeWidth={1} />
              </div>
              <h4 className="text-2xl font-medium">
                Helping connecting mentors and tech professionals <BrMd /> around the world.
              </h4>
              <p className="font-light z-10">
                Keeping tech enthusiasts productive and connected, <BrMd />
                no matter your skill level.
              </p>
              <div className="flex-grow-1"></div>
              <Link to={"/register"} className="underline underline-offset-2">
                Join us
              </Link>
              <Earth
                strokeWidth={0.5}
                className="absolute -bottom-40 md:-bottom-30 right-20 rounded-2xl h-96 w-96 text-primary-theme opacity-45 md:opacity-60"
              />
            </div>
          </div>

        </div>

        <div className="container mb-8">
          <div className="flex items-center gap-5 mb-4">
            <h2 className="text-2xl font-serif tracking-tighter md:text-3xl text-gray-800 font-bold ">
              Why <span className="text-primary-theme">Everyone</span> learns with OwenaHub
            </h2>
            <div className="border-t flex-1" />
          </div>

          <section className="pb-20 lg:pb-9">
            <div className="md:flex items-center gap-20">
              <div className="pt-5 flex flex-col gap-4 basis-3/6">
                <div className="border border-s-4 border-primary-theme bg-primary-bg rounded py-8 px-5 flex flex-col md:flex-row gap-5 md:items-center">
                  <Users size={45} />
                  <div className="flex flex-col gap-3">
                    <div>
                      <h5 className="font-bold text-lg">Professional mentors</h5>
                      <p className="font-light">Learn from industry experts who guide you every step of the way, ensuring you gain the skills you need to succeed.</p>
                    </div>
                    <Link to="/register" className="text-primary-theme font-bold flex items-center gap-2">
                      <span>Find out more</span>
                      <ArrowRight size={18} />
                    </Link>
                  </div>
                </div>
                <div className="border border-s-4 border-primary-theme bg-primary-bg rounded py-8 px-5 flex flex-col md:flex-row gap-5 md:items-center">
                  <Trophy size={45} />
                  <div className="flex flex-col gap-3">
                    <div>
                      <h5 className="font-bold text-lg">Certificate of completion</h5>
                      <p className="font-light">Earn a certificate to showcase your achievements and skills, helping you stand out in your career or academic pursuits.</p>
                    </div>
                    <Link to="/register" className="text-primary-theme font-bold flex items-center gap-2">
                      <span>Find out more</span>
                      <ArrowRight size={18} />
                    </Link>
                  </div>
                </div>
                <div className="border border-s-4 border-primary-theme bg-primary-bg rounded py-8 px-5 flex flex-col md:flex-row gap-5 md:items-center">
                  <MonitorSmartphone size={45} />
                  <div className="flex flex-col gap-3">
                    <div>
                      <h5 className="font-bold text-lg">Access on mobile and TV</h5>
                      <p className="font-light">Learn anytime, anywhere with access on multiple devices, making it easier to fit learning into your busy schedule.</p>
                    </div>
                    <Link to="/register" className="text-primary-theme font-bold flex items-center gap-2">
                      <span>Find out more</span>
                      <ArrowRight size={18} />
                    </Link>
                  </div>
                </div>
                <div className="border border-s-4 border-primary-theme bg-primary-bg rounded py-8 px-5 flex flex-col md:flex-row gap-5 md:items-center">
                  <TvMinimalPlay size={45} />
                  <div className="flex flex-col gap-3">
                    <div>
                      <h5 className="font-bold text-lg">Hours of on-demand video</h5>
                      <p className="font-light">Access a vast library of video content to enhance your learning, with topics ranging from beginner to advanced levels.</p>
                    </div>
                    <Link to="/register" className="text-primary-theme font-bold flex items-center gap-2">
                      <span>Find out more</span>
                      <ArrowRight size={18} />
                    </Link>
                  </div>
                </div>
              </div>
              <div className="pt-5 basis-3/6 hidden md:block">
                <img
                  src="/images/offers.svg"
                  alt="Long-Term Goals"
                  className="w-full"
                  loading="lazy"
                />
              </div>
            </div>
          </section>
        </div>

        <section className="bg-muted py-10">
          <div className="container">
            <div className="flex items-center gap-5 mb-9">
              <h2 className="text-2xl font-serif tracking-tighter md:text-3xl text-gray-800 font-bold">
                Customer Reviews <span className="font-black text-6xl text-primary-theme">.</span>
              </h2>
            </div>
            <div className="flex flex-row items-stretch flex-nowrap gap-6 overflow-x-auto snap-x snap-proximity mb-5 pb-3">
              {reviews.map((review, index) => (
                <div key={index} className="snap-center flex min-w-80 h-max flex-col border border-gray-200 bg-white p-7 rounded-md group hover:border-b !overflow-visible relative transition">
                  <div className="absolute right-4 -top-0">
                    <Quote className="opacity-20 text-muted-foreground h-10 w-10" />
                  </div>
                  <div className="flex flex-col flex-grow justify-between">
                    <div className="flex flex-col gap-1.5 mb-4">
                      <div className="text-sm font-light">
                        {truncateText(review.comment, 100)}
                      </div>
                    </div>

                    <div className="mt-auto">
                      <div className="flex gap-2 items-center">
                        <CustomAvatar name={review.username} styles="h-10 w-10" />
                        <div className="text-sm">
                          <p className="">{review.username}</p>
                          <p className="text-gray-400">{review.career}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  )
}