import { Link, useNavigation } from "react-router";
import { ArrowRight, Briefcase, Check, ChevronRight, Code, Facebook, Instagram, LayoutTemplate, Menu, Regex, Twitter } from "lucide-react";
import Badge from "~/components/custom/badge";
import { useEffect, useState } from "react";
import { truncateText } from "~/lib/texts";
import Rating from "~/components/custom/rating";

const categories = [
  {
    title: "Web Development",
    icon: <LayoutTemplate size={15} />
  },
  {
    title: "Data & Algorithms",
    icon: <Code size={15} />
  },
  {
    title: "Development methodologies",
    icon: <Regex size={15} />
  },
  {
    title: "Career Development",
    icon: <Briefcase size={15} />
  },
]

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
  const { state } = useNavigation();
  let busy: boolean = state === "submitting" || state === "loading";

  const [menu, setMenu] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className={`${busy && "opacity-50"} transition-all`}>
      <div className="bg-muted py-16 relative">
        <div className="container -translate-x-1/2 fixed left-1/2 px-4 top-4 transform z-50">
          {/* Navbar */}
          <nav
            className={`transition-all duration-300 ease-in-out ${scrolled ? "bg-white shadow-[0_5px_35px_rgba(0,0,0,0.1)] py-2 px-3" : "bg-transparent py-0"
              } border-gray-200 rounded-2xl flex justify-between items-center gap-2`}
          >
            <div className="flex gap-2 items-center">
              <img src="/images/logos/logo.png" alt="logo" width={38} />
              <Link to="/" className="text-primary-foreground font-bold md:text-lg">
                <span>OwenaHub</span> <span className="font-light">the learner's hub</span>
              </Link>
            </div>
            <div className="hidden md:block">
              <div className="flex gap-2 items-center">
                <Link to="/login" className="bg-white border border-secondary-foreground rounded-[6px] text-secondary-foreground text-xs font-extrabold hover:shadow-lg px-5 py-1.5 uppercase">
                  Log in
                </Link>
                <Link to="/register" className="bg-[#083156] border border-[#083156] rounded-[6px] text-[#FBE56D] text-xs font-bold hover:bg-gray-800 px-5 py-1.5 uppercase">
                  Sign up
                </Link>
              </div>
            </div>
            <button aria-label="Menu" className="block md:hidden" type="button" onClick={() => setMenu(!menu)}>
              <Menu />
            </button>
          </nav>
          {menu && (
            <div className="bg-white rounded-lg shadow-2xl block md:hidden mt-1 mx-auto px-4 py-4 z-50">
              <div>
                <div className="mb-3">
                  <div className="border-b py-4">
                    <Link to={"/courses"} className="text-primary-foreground font-bold">
                      Courses
                    </Link>
                  </div>
                  <div className="border-b py-4">
                    <Link to={"/classes"} className="text-primary-foreground font-bold">
                      Classes
                    </Link>
                  </div>
                  <div className="py-4">
                    <a href="tel:+2348026658956" className="flex text-foreground text-sm font-light gap-2 items-center">
                      <span>Contact support</span> <ChevronRight size={12} />
                    </a>
                  </div>
                </div>
                <div className="flex flex-col gap-4">
                  <Link to="/login" className="bg-white border border-secondary-foreground rounded-[6px] text-center text-secondary-foreground text-sm w-full block font-extrabold hover:shadow-lg py-2 uppercase">
                    Log in
                  </Link>
                  <Link to="/register" className="bg-[#083156] border border-[#083156] rounded-[6px] text-[#FBE56D] text-center text-sm w-full block font-bold hover:bg-gray-800 py-2 uppercase">
                    Sign up
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
        <header className="lg:pt-16 pb-10 pt-[4rem]">
          <section className="container justify-between gap-20 items-center md:flex">
            <div className="text-start md:text-start">
              <h1 className="text-4xl text-primary-foreground text-start font-extrabold lg:text-5xl md:text-start mt-3 tracking-tight z-10">
                <span className="text-primary-foreground">Your code deserves a stage,</span>
                <br className="hidden md:block" />{" "}
                <span className="text-primary">Your career deserves a guide.</span>
              </h1>

              <section className="flex flex-col text-muted-foreground gap-5 mb-10 mt-5">
                <span className="text-sm md:text-lg">
                  Create stunning portfolios to showcase your work and access <br className="hidden md:block" />
                  expert-led courses to level up your skills
                </span>
              </section>

              <div className="flex flex-col gap-5 items-center md:flex-row z-10">
                <Link to="/register" className="bg-[#083156] rounded-md shadow-md text-[#FBE56D] text-center text-sm w-full block font-bold hover:bg-gray-800 md:inline-block md:w-max px-10 py-2.5 transition">
                  GET STARTED
                </Link>
                <a
                  rel="noopener"
                  href="https://youtu.be/hBDECFvIk8w?si=G_1qfFhyCYJWwVv8"
                  target="_blank"
                  className="bg-white rounded-md text-[#083156] text-center text-sm w-full block font-bold hover:shadow-lg md:inline-block md:w-max outline outline-[#083156] px-10 py-2.5"
                >
                  Create portfolio
                </a>
              </div>

            </div>
            <div className="flex-1 hidden md:block me-14">
              <img
                src="/images/personalised.png"
                alt="Join OwenaHub"
                className="h-[440px]pointer-events-none w-[440px] block mx-auto"
              />
            </div>
          </section>
        </header>
      </div>

      <section className="py-10">
        <div className="container mx-auto">
          <div className="py-5">
            <div className="lg:text-start pb-5">
              <h2 className="text-3xl text-gray-800 font-bold md:text-4xl pb-2">
                Expand your skillset <br className="md:hidden" /> with <span className="text-foreground">OwenaHub</span>.
              </h2>
              <p className="text-gray-500">
                Find resources curated by our team for Tech Enthusiasts.
              </p>
            </div>

            <section className="flex flex-wrap gap-2 items-center mb-20 whitespace-nowrap">
              {categories.map((category, index) => (
                <Badge
                  key={index}
                  icon={category.icon}
                  title={category.title}
                />
              ))}
            </section>

            <section>
              <div className="mx-auto pb-10 sm:pb-16">
                <div className="grid grid-cols-1 gap-x-4 gap-y-6 lg:grid-cols-4 sm:grid-cols-2 xl:gap-x-6">
                  {tracks.map((track, index) => (
                    <div key={index} className="flex flex-col border border-b-4 border-gray-200 h-full p-2 rounded-lg group hover:border-b relative transition">
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
                            <h3 className="text-primary-foreground font-bold leading-5">
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
              </div>
            </section>
          </div>
        </div>
      </section>

      <section className="container lg:pb-9 pb-20" id="learn-more">
        <div className="justify-evenly gap-5 items-center md:flex pt-5">
          <div>
            <img
              src="/images/personalised.png"
              alt="Personalized Learning"
              className="w-full"
              loading="lazy"
            />
          </div>

          <div>
            <div className="text-gray-800 lg:px-4 pt-5">
              <div>
                <h4 className="text-3xl text-foreground font-bold mb-4 md:text-4xl">
                  Personalised learning
                </h4>
                <p className="text-base leading-snug mb-4">
                  OwenaHub offers courses focused on mentorship. <br className="hidden lg:block" />
                  Enroll in mentorship courses & learn at your own pace.
                </p>
                <Link to="/register" target="_blank"
                  className="bg-[#FFE1BC] rounded-xl text-[#3D4D5C] font-bold hover:bg-gray-800 hover:text-white inline-block px-6 py-2 transition">
                  Take a look
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container lg:pb-9 pb-20">
        <div className="mx-auto">
          <div className="flex-row-reverse justify-evenly gap-5 items-center md:flex">
            <div className="pt-5">
              <img
                src="/images/long-term-goals.png"
                alt="Long-Term Goals"
                className="w-full"
                loading="lazy"
              />
            </div>
            <div className="text-gray-800 lg:px-4 pt-5">
              <div className="mb-5">
                <span className="text-lg text-red-500 font-bold">Visions Into Reality</span>
                <h4 className="text-[#4B4B4B] text-4xl font-bold mb-4 mt-3">
                  Stop dreaming, start achieving
                </h4>
                <p className="text-lg leading-relaxed mb-4">
                  Work towards long-term goals by connecting <br className="hidden lg:block" /> with mentors for private sessions.
                </p>
                <Link to="/register"
                  className="bg-[#FFE1BC] rounded-xl text-[#3D4D5C] font-bold hover:bg-gray-800 hover:text-white inline-block px-6 py-2 transition">
                  See mentors for you <ArrowRight className="inline-block ms-1 relative" size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container lg:pb-9 pb-20">
        <div className="mx-auto">
          <div className="justify-evenly gap-5 items-center md:flex">
            <div className="pt-5">
              <img
                src="/images/get-access.png"
                alt="Get Access"
                className="w-full"
                loading="lazy"
              />
            </div>
            <div className="text-gray-800 lg:px-4 py-5">
              <div className="mb-5">
                <span className="text-[#F6A600] text-lg font-bold">Talk With Experts</span>
                <h4 className="text-[#4B4B4B] text-4xl font-bold mb-4 mt-3">
                  Easy access to the <br className="hidden lg:block" /> world’s best
                </h4>
                <p className="text-lg leading-relaxed mb-4">
                  From Web Development to Software Engineering, <br className="hidden lg:block" /> there are thousands of top
                  experts, you can get access for free.
                </p>
                <a
                  href="https://youtube.com/@owenahub"
                  target="_blank"
                  rel="noopener"
                  className="bg-[#FFE1BC] rounded-xl text-[#3D4D5C] font-bold hover:bg-gray-800 hover:text-white inline-block px-6 py-2 transition"
                >
                  Our YouTube
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mb-16">
        <section className="bg-primary-foreground rounded-3xl shadow-xl mx-auto py-10">
          <div>
            <div className="text-center px-5">
              <div className="text-white mb-6">
                <h4 className="text-2xl font-bold lg:text-4xl mb-5">
                  Get started
                </h4>
                <p className="text-sm leading-loose my-3">
                  Sign up now and start acquiring in demand tech skills today. Start online anytime, anywhere. <br className="hidden md:block" />
                  Fill out the form and have mentor reach out. Start your learning journey.
                </p>
              </div>
              <div>
                <Link to="/register"
                  className="bg-secondary bg-secondary-auxiliary rounded-xl shadow text-black w-full font-bold hover:bg-gray-800 inline-block md:w-max px-6 py-3.5 transition">
                  GET STARTED
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>

      <footer className="bg-gray-50 text-gray-700 py-8" id="footer">
        <div className="container text-sm">
          <div className="justify-between block items-center md:flex">
            <div>
              <div className="flex items-center space-x-2">
                <img src="/images/logos/logo.png" alt="..." className="h-6 w-6 relative top-[2px]" />
                <div className="font-bold relative top-[3px]">OwenaHub</div>
              </div>
            </div>
            <p className="md:mt-0 mt-6">
              <span className="font-semibold">The Learner's Hub</span> <br />
              <span className="text-xs"> Fostering global connections, leveraging experts <br /> to empower learners through mentorship.</span>
            </p>
          </div>
          <hr className="border-gray-200 my-8" />
          <div className="grid grid-cols-1 gap-4 md:grid-cols-4 mt-3">
            <div>
              <h5 className="text-sm font-semibold pb-2">SOCIALS</h5>
              <a
                href="https://instagram.com/owenahub?utm_source=qr&igshid=MzNlNGNkZWQ4Mg%3D%3D"
                target="_blank"
                className="flex text-xs gap-2 hover:underline items-center pb-2"
                rel="noopener"
              >
                <Instagram size={14} className="inline-block" /> <span>Instagram</span>
              </a>
              <a
                href="https://x.com/owenahub?t=i4-Iz4K9RaKJ4vWP1QuLlA&s=08"
                target="_blank"
                className="flex text-xs gap-2 hover:underline items-center pb-2"
                rel="noopener"
              >
                <Twitter size={14} className="inline-block" /> <span>Twitter</span>
              </a>
              <a
                href="https://www.facebook.com/owenahub?mibextid=ZbWKwL"
                target="_blank"
                className="flex text-xs gap-2 hover:underline items-center pb-2"
                rel="noopener"
              >
                <Facebook size={14} className="inline-block" /> <span>Facebook</span>
              </a>
            </div>
            <div>
              <h5 className="text-sm font-semibold pb-2">CONTACT</h5>
              <a href="mailto:hello@owenahub.com"
                className="text-xs block hover:underline pb-2">hello@owenahub.com</a>
              <a href="mailto:ernest@owenahub.com"
                className="text-xs block hover:underline pb-2">ernest@owenahub.com</a>
              <a href="mailto:ernestharuna1@gmail.com"
                className="text-xs block hover:underline pb-2">ernestharuna1@gmail.com</a>
            </div>
            <div>
              <h5 className="text-sm font-semibold pb-2">QUICK LINKS</h5>
              <a href="#" className="text-xs block hover:underline pb-2">
                OwenaHub Blog
              </a>
              <a href="#"
                className="text-xs block hover:underline pb-2">
                Slices: <span className="text-theme font-semibold">Swift Swips</span>
              </a>
              <a href="#"
                className="text-xs block hover:underline pb-2">
                Private Sessions
              </a>
            </div>
            <div>
              <h5 className="text-sm font-semibold pb-2">COMMUNITIES</h5>
              <a
                href="https://linkedin.com/company/owenahub" target="_blank"
                className="text-xs block hover:underline pb-2"
                rel="noopener"
              >
                LinkedIn Community
              </a>
              <a
                href="https://www.facebook.com/groups/896520008575738/?ref=share"
                target="_blank"
                className="text-xs block hover:underline pb-2"
                rel="noopener"
              >
                Facebook Community
              </a>
            </div>
          </div>
          <div className="justify-between text-gray-500 text-xs block items-center md:flex-row mt-6">
            <p className="m-0">&copy; 2025, OwenaHub. All Rights Reserved.</p>
            <p className="m-0">
              <Link to="#" className="hover:underline">Privacy Policy</Link> &middot; {" "}
              <Link to="#" className="hover:underline">Terms of Service</Link>
            </p>
          </div>
        </div>
      </footer>
    </section>
  )
}