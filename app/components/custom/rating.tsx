import { Star } from 'lucide-react';

export default function Rating({ rating = 5 }: { rating?: number }) {
    const emptyStars = Array.from({ length: 5 - Math.round(rating) });

    return (
        <div className="flex gap-1 items-center">
            {Array.from({ length: Math.round(rating) }).map((_, index) => (
                <Star
                    key={index}
                    className="text-primary-theme fill-current"
                    size={14}
                />
            ))}

            {emptyStars.map((_, index) => (
                <Star
                    key={index + "empty"}
                    className="text-primary-theme fill-none"
                    size={14}
                />
            ))}
        </div>
    )
}
