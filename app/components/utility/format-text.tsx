
export function FormatLineBreaks({ input }: { input: string | undefined }) {
    return (input ?? '').split('\n').map((line: string, index: number) => (
        <p key={index} className="mb-2 text-wrap">{line}</p>
    ));
}