export default function TextSkeleton({ lineCount = 1 }: { lineCount?: number }) {
    return (
        <div className="flex flex-col gap-4">
            {Array.from({ length: lineCount }).map((_, index) => (
                <div key={index} className="h-4 w-full bg-gray-100 animate-pulse rounded-lg" />
            ))}
        </div>
    )
}