import { Link } from 'react-router'
import Rating from '~/components/custom/rating'
import EmptyState from '~/components/skeletons/empty-state'
import { STORAGE_URL } from '~/lib/keys'
import { truncateText } from '~/lib/texts'

export default function Courses({ courses }: { courses: Course[] }) {
  return (
    <div>
      <div className="grid grid-cols-1 gap-x-4 gap-y-6 lg:grid-cols-4 sm:grid-cols-2 xl:gap-x-6 mb-5 animated fadeIn">
        {courses.length
          ? courses.map((course) => (
            <CourseCard course={course} key={course.id} />
          ))
          : <EmptyState resource="courses" />
        }
      </div>
    </div>
  )
}

function CourseCard({ course }: { course: Course }) {
  return (
    <div className="grid grid-cols-4 shadow border-t bg-white h-full rounded-lg group relative transition">
      <div className="bg-slate-100 ms-2 mt-2 md:ms-0 md:mt-0 col-span-1 md:col-span-4 md:rounded-t-lg w-full aspect-square group-hover:opacity-75 lg:aspect-auto lg:h-44 overflow-hidden">
        <img
          src={course.thumbnail
            ? `${STORAGE_URL}/${course.thumbnail}`
            : "/images/banners/default-course-img.png"}
          alt={course.title}
          className="h-full rounded w-full object-cover"
        />
      </div>

      {/* Content Wrapper */}
      <div className="flex flex-col col-span-3 flex-grow justify-between px-4 py-2">
        {/* Title & Description */}
        <div className="flex flex-col gap-1.5 mb-5">
          <div className="flex items-center">
            <h3 className="text-primary font-bold leading-5 mb-1">
              <span className="leading-[-5px]">{course.title}</span>
              <Link to={`/courses/${course.id}`}>
                <span aria-hidden="true" className="absolute inset-0" />
              </Link>
            </h3>
          </div>
          <div className="text-xs font-light">
            <div dangerouslySetInnerHTML={{ __html: truncateText(course.about, 100) }} />
          </div>
        </div>

        {/* Rating & Price - Pushed to the bottom */}
        <div className="mt-auto">
          <div className="flex gap-2 items-center text-xs mb-2">
            <p className="text-yellow-800 font-extrabold">4.7</p>
            <div className="flex gap-1">
              <Rating rating={4.7} />
            </div>
            <p className="text-gray-400">(99+)</p>
          </div>
          <div className="flex gap-2 items-center">
            <p className="font-bold">₦{parseInt(course.price).toLocaleString()}</p>
            <p className="font-light text-gray-500 line-through">₦{(parseInt(course.price) + 12000).toLocaleString()}</p>
          </div>
        </div>
      </div>
    </div>
  )
}