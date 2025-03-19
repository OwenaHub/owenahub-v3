export default function Tags({ args }: { args: string }) {
    let tags = args.split(',');
    return (
        <p className='flex gap-1 flex-wrap'>
            {tags.map((tag, index) => (
                <span key={index} className='border px-2 py-0 rounded-lg border-sky-700 bg-sky-100 text-sky-900 text-xs'>{tag}</span>
            ))}
        </p>
    )
}
