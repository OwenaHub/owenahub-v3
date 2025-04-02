export default function CardSkeleton({ type }: { type?: "course" | "slice" }) {
    if (type === "course") {
        return (
            <div className="grid grid-cols-1 gap-x-4 gap-y-6 lg:grid-cols-4 sm:grid-cols-2 xl:gap-x-6 mb-5 animated fadeIn">
                {Array.from({ length: 4 }).map((_, index) => (
                    <div key={index} className="h-[10rem] md:h-[20rem] bg-gray-100 animate-pulse rounded-lg" />
                ))}
            </div>
        )
    } else {
        return (
            <div className="flex flex-col md:flex-row gap-3">
                {Array.from({ length: 2 }).map((_, index) => (
                    <div key={index} className="flex-1 h-20 bg-gray-100 animate-pulse rounded-lg mb-2" />
                ))}
            </div>
        )
    }
}