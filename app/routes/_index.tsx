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
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 container px-4">
          {/* Navbar */}
          <nav
            className={`transition-all duration-300 ease-in-out ${scrolled ? "bg-white shadow-[0_5px_35px_rgba(0,0,0,0.1)] py-2 px-3" : "bg-transparent py-0"
              } border-gray-200 rounded-2xl flex justify-between items-center gap-2`}
          >
            <div className="flex gap-2 items-center">
              <img src="/images/logos/logo.png" alt="logo" width={38} />
              <Link to="/" className="md:text-lg font-black text-primary-foreground">
                <span>OwenaHub</span> <span className="font-light">the learner's hub</span>
              </Link>
            </div>
            <div className="hidden md:block">
              <div className="flex items-center gap-2">
                <Link to="/login" className="border border-secondary-foreground bg-white text-xs text-secondary-foreground font-extrabold rounded-[6px] uppercase hover:shadow-lg px-5 py-1.5">
                  Log in
                </Link>
                <Link to="/register" className="border border-[#083156] text-[#FBE56D] bg-[#083156] hover:bg-gray-800 text-xs font-bold rounded-[6px] uppercase px-5 py-1.5">
                  Sign up
                </Link>
              </div>
            </div>
            <button aria-label="Menu" className="block md:hidden" type="button" onClick={() => setMenu(!menu)}>
              <Menu />
            </button>
          </nav>
          {menu && (
            <div className="bg-white mt-1 z-50 py-4 px-4 mx-auto rounded-lg shadow-2xl block md:hidden">
              <div>
                <div className="mb-3">
                  <div className="border-b py-4">
                    <Link to={"/courses"} className="font-bold text-primary-foreground">
                      Courses
                    </Link>
                  </div>
                  <div className="border-b py-4">
                    <Link to={"/classes"} className="font-bold text-primary-foreground">
                      Classes
                    </Link>
                  </div>
                  <div className="py-4">
                    <a href="tel:+2348026658956" className="font-light text-sm text-foreground flex gap-2 items-center">
                      <span>Contact support</span> <ChevronRight size={12} />
                    </a>
                  </div>
                </div>
                <div className="flex flex-col gap-4">
                  <Link to="/login" className="block w-full text-center border border-secondary-foreground bg-white text-sm text-secondary-foreground font-extrabold rounded-[6px] uppercase hover:shadow-lg py-2">
                    Log in
                  </Link>
                  <Link to="/register" className="block w-full text-center border border-[#083156] text-[#FBE56D] bg-[#083156] hover:bg-gray-800 text-sm font-bold rounded-[6px] uppercase py-2">
                    Sign up
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
        <header className="pt-[4rem] pb-10 lg:pt-16">
          <section className="md:flex container items-center gap-20">
            <div className="text-start md:text-start">
              <h1 className="mt-3 z-10 capitalize text-4xl lg:text-6xl font-extrabold tracking-tight text-primary-foreground">
                Build your career {" "}
                <br className="hidden md:block" />
                with <span className="text-foreground">Expert mentors</span>.
              </h1>

              <section className="flex flex-col gap-5 text-muted-foreground my-12">
                <div className="flex items-center gap-4">
                  <div className="rounded-lg p-1.5 bg-secondary border border-secondary-foreground">
                    <Check size={14} strokeWidth={4} className="text-secondary-foreground" />
                  </div>
                  <h2>Learn online, from professionals</h2>
                </div>
                <div className="flex items-center gap-4">
                  <div className="rounded-lg p-1.5 bg-secondary border border-secondary-foreground">
                    <Check size={14} strokeWidth={4} className="text-secondary-foreground" />
                  </div>
                  <h2>Get results in 3 months</h2>
                </div>
                <div className="flex items-center gap-4">
                  <div className="rounded-lg p-1.5 bg-secondary border border-secondary-foreground">
                    <Check size={14} strokeWidth={4} className="text-secondary-foreground" />
                  </div>
                  <h2>A fraction of the cost of other platforms</h2>
                </div>
              </section>

              <div className="z-10 flex flex-col md:flex-row items-center gap-5">
                <Link to="/register" className="transition block md:inline-block text-sm text-center w-full md:w-max rounded-lg font-bold px-10 py-3 shadow-md text-[#FBE56D] bg-[#083156] hover:bg-gray-800">
                  GET STARTED
                </Link>
                <a
                  rel="noopener"
                  href="https://youtu.be/hBDECFvIk8w?si=G_1qfFhyCYJWwVv8"
                  target="_blank"
                  className="block md:inline-block text-sm text-center w-full md:w-max rounded-lg font-bold px-10 py-3 outline outline-[#083156] text-[#083156] bg-white hover:shadow-lg"
                >
                  Watch a video
                </a>
              </div>

            </div>
            <div className="hidden md:block me-14 flex-1">
              <img
                src="/images/personalised.png"
                alt="Join OwenaHub"
                className="block mx-auto w-[440px] h-[440px]pointer-events-none"
              />
            </div>
          </section>
        </header>
      </div>

      <section className="py-10">
        <div className="container mx-auto">
          <div className="py-5">
            <div className="lg:text-start pb-5">
              <h2 className="text-gray-800 pb-2 font-bold text-3xl md:text-4xl">
                Expand your skillset <br className="md:hidden" /> with <span className="text-foreground">OwenaHub</span>.
              </h2>
              <p className="text-gray-500">
                Find resources curated by our team for Tech Enthusiasts.
              </p>
            </div>

            <section className="flex flex-wrap mb-20 items-center gap-2 whitespace-nowrap">
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
                <div className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-6">
                  {tracks.map((track, index) => (
                    <div key={index} className="group p-2 relative border border-gray-200 border-b-4 rounded-lg hover:border-b transition h-full flex flex-col">
                      {/* Course Image */}
                      <div className="aspect-video bg-slate-100 w-full rounded-lg group-hover:opacity-75 lg:aspect-auto lg:h-36 overflow-hidden">
                        <img
                          src={track.image_path
                            ? `${track.image_path}`
                            : "/images/banners/default-course-img.png"}
                          alt={track.title}
                          className="w-full h-full object-cover rounded"
                        />
                      </div>

                      {/* Content Wrapper */}
                      <div className="flex flex-col justify-between flex-grow mt-2">
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
                          <div className="font-light text-xs">
                            {truncateText(track.description, 100)}
                          </div>
                        </div>

                        {/* Rating & Price - Pushed to the bottom */}
                        <div className="mt-auto">
                          <div className="flex items-center gap-2">
                            <p className="font-extrabold text-yellow-800">4.5</p>
                            <div className="flex gap-1">
                              <Rating rating={track.rating} />
                            </div>
                            <p>({track.enrollCount})</p>
                          </div>
                          <div className="flex items-center gap-2">
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

      <section className="pb-20 lg:pb-9 container" id="learn-more">
        <div className="md:flex items-center justify-evenly gap-5 pt-5">
          <div>
            <img
              src="/images/personalised.png"
              alt="Personalized Learning"
              className="w-full"
              loading="lazy"
            />
          </div>

          <div>
            <div className="text-gray-800 pt-5 lg:px-4">
              <div>
                <h4 className="text-foreground text-3xl md:text-4xl font-bold mb-4">
                  Personalised learning
                </h4>
                <p className="text-base leading-snug mb-4">
                  OwenaHub offers courses focused on mentorship. <br className="hidden lg:block" />
                  Enroll in mentorship courses & learn at your own pace.
                </p>
                <Link to="/register" target="_blank"
                  className="inline-block bg-[#FFE1BC] text-[#3D4D5C] rounded-xl px-6 py-2 font-bold hover:bg-gray-800 hover:text-white transition">
                  Take a look
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-20 lg:pb-9 container">
        <div className=" mx-auto">
          <div className="md:flex items-center justify-evenly gap-5 flex-row-reverse">
            <div className="pt-5">
              <img
                src="/images/long-term-goals.png"
                alt="Long-Term Goals"
                className="w-full"
                loading="lazy"
              />
            </div>
            <div className="text-gray-800 pt-5 lg:px-4">
              <div className="mb-5">
                <span className="text-red-500 text-lg font-bold">Visions Into Reality</span>
                <h4 className="text-4xl font-bold text-[#4B4B4B] mt-3 mb-4">
                  Stop dreaming, start achieving
                </h4>
                <p className="text-lg leading-relaxed mb-4">
                  Work towards long-term goals by connecting <br className="hidden lg:block" /> with mentors for private sessions.
                </p>
                <Link to="/register"
                  className="inline-block bg-[#FFE1BC] text-[#3D4D5C] rounded-xl px-6 py-2 font-bold hover:bg-gray-800 hover:text-white transition">
                  See mentors for you <ArrowRight className="inline-block relative ms-1" size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-20 lg:pb-9 container">
        <div className="mx-auto">
          <div className="md:flex items-center justify-evenly gap-5">
            <div className="pt-5">
              <img
                src="/images/get-access.png"
                alt="Get Access"
                className="w-full"
                loading="lazy"
              />
            </div>
            <div className="text-gray-800 py-5 lg:px-4">
              <div className="mb-5">
                <span className="text-[#F6A600] text-lg font-bold">Talk With Experts</span>
                <h4 className="text-4xl font-bold text-[#4B4B4B] mt-3 mb-4">
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
                  className="inline-block bg-[#FFE1BC] text-[#3D4D5C] rounded-xl px-6 py-2 font-bold hover:bg-gray-800 hover:text-white transition"
                >
                  Our YouTube
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mb-16">
        <section className="bg-primary-foreground shadow-xl rounded-3xl mx-auto py-10">
          <div>
            <div className="text-center px-5">
              <div className="mb-6 text-white">
                <h4 className="text-2xl lg:text-4xl font-bold mb-5">
                  Get started
                </h4>
                <p className="my-3 text-sm leading-loose">
                  Sign up now and start acquiring in demand tech skills today. Start online anytime, anywhere. <br className="hidden md:block" />
                  Fill out the form and have mentor reach out. Start your learning journey.
                </p>
              </div>
              <div>
                <Link to="/register"
                  className="inline-block w-full md:w-max bg-secondary-auxiliary text-black rounded-xl shadow font-bold px-6 py-3.5 hover:bg-gray-800 transition">
                  GET STARTED
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>

      <footer className="bg-gray-50 py-8 text-gray-700" id="footer">
        <div className="container text-sm">
          <div className="block md:flex justify-between items-center">
            <div>
              <div className="flex items-center space-x-2">
                <img src="/images/logos/logo.png" alt="..." className="w-6 h-6 relative top-[2px]" />
                <div className="font-bold relative top-[3px]">OwenaHub</div>
              </div>
            </div>
            <p className="mt-6 md:mt-0">
              <span className="font-semibold">The Learner's Hub</span> <br />
              <span className="text-xs"> Fostering global connections, leveraging experts <br /> to empower learners through mentorship.</span>
            </p>
          </div>
          <hr className="my-8 border-gray-200" />
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-3">
            <div>
              <h5 className="text-sm pb-2 font-semibold">SOCIALS</h5>
              <a
                href="https://instagram.com/owenahub?utm_source=qr&igshid=MzNlNGNkZWQ4Mg%3D%3D"
                target="_blank"
                className="flex items-center gap-2 hover:underline text-xs pb-2"
                rel="noopener"
              >
                <Instagram size={14} className="inline-block" /> <span>Instagram</span>
              </a>
              <a
                href="https://x.com/owenahub?t=i4-Iz4K9RaKJ4vWP1QuLlA&s=08"
                target="_blank"
                className="flex items-center gap-2 hover:underline text-xs pb-2"
                rel="noopener"
              >
                <Twitter size={14} className="inline-block" /> <span>Twitter</span>
              </a>
              <a
                href="https://www.facebook.com/owenahub?mibextid=ZbWKwL"
                target="_blank"
                className="flex items-center gap-2 hover:underline text-xs pb-2"
                rel="noopener"
              >
                <Facebook size={14} className="inline-block" /> <span>Facebook</span>
              </a>
            </div>
            <div>
              <h5 className="text-sm pb-2 font-semibold">CONTACT</h5>
              <a href="mailto:hello@owenahub.com"
                className="block hover:underline text-xs pb-2">hello@owenahub.com</a>
              <a href="mailto:ernest@owenahub.com"
                className="block hover:underline text-xs pb-2">ernest@owenahub.com</a>
              <a href="mailto:ernestharuna1@gmail.com"
                className="block hover:underline text-xs pb-2">ernestharuna1@gmail.com</a>
            </div>
            <div>
              <h5 className="text-sm pb-2 font-semibold">QUICK LINKS</h5>
              <a href="#" className="block hover:underline text-xs pb-2">
                OwenaHub Blog
              </a>
              <a href="#"
                className="block hover:underline text-xs pb-2">
                Slices: <span className="text-theme font-semibold">Swift Swips</span>
              </a>
              <a href="#"
                className="block hover:underline text-xs pb-2">
                Private Sessions
              </a>
            </div>
            <div>
              <h5 className="text-sm pb-2 font-semibold">COMMUNITIES</h5>
              <a
                href="https://linkedin.com/company/owenahub" target="_blank"
                className="block hover:underline text-xs pb-2"
                rel="noopener"
              >
                LinkedIn Community
              </a>
              <a
                href="https://www.facebook.com/groups/896520008575738/?ref=share"
                target="_blank"
                className="block hover:underline text-xs pb-2"
                rel="noopener"
              >
                Facebook Community
              </a>
            </div>
          </div>
          <div className="mt-6 block md:flex-row justify-between items-center text-xs text-gray-500">
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