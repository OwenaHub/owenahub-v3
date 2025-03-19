export default function CardSkeleton({ type }: { type?: "course" | "slice" }) {
    if (type === "course") {
        return (
            <div className="grid grid-cols-1 gap-x-3 gap-y-4 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-3">
                {Array.from({ length: 3 }).map((_, index) => (
                    <div key={index} className="aspect-square bg-gray-100 animate-pulse rounded-lg" />
                ))}
            </div>
        )
    } else {
        return (
            <>
                {Array.from({ length: 2 }).map((_, index) => (
                    <div key={index} className="flex-1 h-20 bg-gray-100 animate-pulse rounded-lg" />
                ))}
            </>
        )
    }
}