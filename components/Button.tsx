export const goldButtonClasses =
    "rounded-full bg-brand-gold px-6 py-3 font-semibold text-brand-bg shadow-lg shadow-black/20 transition hover:-translate-y-0.5 hover:bg-brand-gold-hover hover:shadow-xl";

export const outlineButtonClasses =
    "rounded-full border border-brand-outline px-6 py-3 font-semibold text-brand-fg transition hover:-translate-y-0.5 hover:border-brand-gold hover:bg-brand-surface";

export function GoldButton({
    href,
    className,
    children,
}: {
    href: string;
    className?: string;
    children: string;
}) {
    return (
        <a href={href} className={[goldButtonClasses, className].filter(Boolean).join(" ")}>
            {children}
        </a>
    );
}

export function OutlineButton({
    href,
    className,
    children,
}: {
    href: string;
    className?: string;
    children: string;
}) {
    return (
        <a href={href} className={[outlineButtonClasses, className].filter(Boolean).join(" ")}>
            {children}
        </a>
    );
}
