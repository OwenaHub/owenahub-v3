export default function AppName({ size = "sm" }: { size?: string }) {
    const sizeClass = {
        "sm": "text-sm",
        "base": "text-base",
        "6xl": "text-6xl",
        "7xl": "text-7xl",
        "8xl": "text-8xl",
        "9xl": "text-9xl",
    }[size] || "text-base"; // Fallback to base size if not found

    return (
        <div className={`font-extrabold ${sizeClass}`}>
            <span className="text-foreground">OwenaHub</span>
        </div>
    );
}