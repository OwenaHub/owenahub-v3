import { Link } from 'react-router'
import CustomAvatar from '~/components/custom/custom-avatar'

export default function PostCard({ title, image, slug }: {
    title: string, slug: string, image: string
}) {
    return (
        <div
            className="relative p-5 flex flex-col justify-between h-[250px] md:h-[300px] bg-gray-100 cursor-pointer hover:outline outline-[#315E8B] transition"
            style={{
                backgroundImage: image ? `url(${image})` : undefined,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <div className="absolute inset-0 bg-black/60 bg-opacity-50"/>
            <div className="relative z-10">
                <span className="text-xs md:text-sm text-gray-200 font-light">
                    8 minutes read — 31 Jan 2024
                </span>
                <h2 className="text-xl md:text-2xl font-bold text-white pt-3">
                    {title}
                </h2>
            </div>
            <div className="relative z-10 flex items-center gap-2">
                <CustomAvatar styles='w-[3.2rem] h-[3.2rem] text-lg' name='OwenaHub' />
                <div className='text-xs text-white'>
                    <p className="font-semibold">Ernest Haruna</p>
                    <p className="font-light">Mentor at OwenaHub</p>
                </div>
            </div>
            <Link
                to={`/blog/${slug}`}
                aria-hidden="true"
                className="absolute inset-0"
            />
        </div>
    )
}
