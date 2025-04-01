export default function Tags({ args }: { args: string }) {
    let tags = args.split(',');
    return (
        <p className='flex gap-2 flex-wrap'>
            {tags.map((tag, index) => (
                <span key={index} className='border px-4 py-2 uppercase font-medium rounded border-sky-700 bg-sky-100 text-sky-900 text-xs'>{tag}</span>
            ))}
        </p>
    )
}
