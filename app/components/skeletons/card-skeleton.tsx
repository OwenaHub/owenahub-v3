export default function CardSkeleton({ count = 2 }: { count?: number }) {
    return (
        <div className="flex flex-col gap-3">
            {Array.from({ length: count }).map((_, index) => (
                <div key={index} className="w-full h-24 bg-gray-100 animate-pulse rounded-lg" />
            ))}
        </div>
    )
}