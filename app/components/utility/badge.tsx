export default function Badge({ text }: { text: string }) {
    return (
        <span className='rounded-full bg-white text-xs py-1 px-3'>
            {text}
        </span>
    )
}
